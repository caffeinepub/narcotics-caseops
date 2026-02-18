import Array "mo:core/Array";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
    badgeNumber : Text;
    rank : Text;
    department : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile unless you are an admin");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  type Case = {
    id : Nat;
    title : Text;
    description : Text;
    status : CaseStatus;
    leadInvestigator : Principal;
    dateOpened : Text;
    involvedOfficers : [Principal];
  };

  type CaseStatus = {
    #open;
    #underInvestigation;
    #closed;
    #archived;
  };

  type InvestigationTask = {
    id : Nat;
    caseId : Nat;
    description : Text;
    assignedOfficer : Principal;
    status : TaskStatus;
    deadline : Text;
  };

  type TaskStatus = {
    #pending;
    #inProgress;
    #completed;
    #overdue;
  };

  type OfficerActivityLog = {
    id : Nat;
    officer : Principal;
    activityType : ActivityType;
    description : Text;
    timestamp : Text;
  };

  type ActivityType = {
    #patrol;
    #arrest;
    #evidenceCollection;
    #witnessInterview;
    #surveillance;
  };

  type EvidenceItem = {
    id : Nat;
    caseId : Nat;
    description : Text;
    collectedBy : Principal;
    dateCollected : Text;
    evidenceType : { #physical; #digital; #testimonial };
    status : EvidenceStatus;
  };

  type EvidenceStatus = {
    #inCustody;
    #analyzed;
    #returned;
    #destroyed;
  };

  module Case {
    public func compare(c1 : Case, c2 : Case) : Order.Order {
      Nat.compare(c1.id, c2.id);
    };
  };

  module InvestigationTask {
    public func compare(t1 : InvestigationTask, t2 : InvestigationTask) : Order.Order {
      Nat.compare(t1.id, t2.id);
    };
  };

  module OfficerActivityLog {
    public func compare(l1 : OfficerActivityLog, l2 : OfficerActivityLog) : Order.Order {
      Nat.compare(l1.id, l2.id);
    };
  };

  module EvidenceItem {
    public func compare(e1 : EvidenceItem, e2 : EvidenceItem) : Order.Order {
      Nat.compare(e1.id, e2.id);
    };
  };

  let cases = Map.empty<Nat, Case>();
  let investigationTasks = Map.empty<Nat, InvestigationTask>();
  let officerActivityLogs = Map.empty<Nat, OfficerActivityLog>();
  let evidenceItems = Map.empty<Nat, EvidenceItem>();

  public shared ({ caller }) func createCase(
    title : Text,
    description : Text,
    leadInvestigator : Principal,
    dateOpened : Text
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create cases");
    };
    let id = cases.size() + 1;
    let newCase : Case = {
      id;
      title;
      description;
      status = #open;
      leadInvestigator;
      dateOpened;
      involvedOfficers = [leadInvestigator];
    };
    cases.add(id, newCase);
    id;
  };

  public shared ({ caller }) func updateCaseStatus(caseId : Nat, status : CaseStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update case status");
    };
    let existingCase = switch (cases.get(caseId)) {
      case (?c) { c };
      case (null) { Runtime.trap("Case not found") };
    };
    let updatedCase = {
      existingCase with
      status;
    };
    cases.add(caseId, updatedCase);
  };

  public query ({ caller }) func getCase(caseId : Nat) : async ?Case {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view cases");
    };
    cases.get(caseId);
  };

  public query ({ caller }) func getAllCases() : async [Case] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view cases");
    };
    cases.values().toArray().sort();
  };

  public shared ({ caller }) func createInvestigationTask(
    caseId : Nat,
    description : Text,
    assignedOfficer : Principal,
    deadline : Text
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create investigation tasks");
    };
    let id = investigationTasks.size() + 1;
    let newTask : InvestigationTask = {
      id;
      caseId;
      description;
      assignedOfficer;
      status = #pending;
      deadline;
    };
    investigationTasks.add(id, newTask);
    id;
  };

  public shared ({ caller }) func updateTaskStatus(taskId : Nat, status : TaskStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update task status");
    };
    let existingTask = switch (investigationTasks.get(taskId)) {
      case (?t) { t };
      case (null) { Runtime.trap("Task not found") };
    };
    let updatedTask = {
      existingTask with
      status;
    };
    investigationTasks.add(taskId, updatedTask);
  };

  public query ({ caller }) func getInvestigationTask(taskId : Nat) : async ?InvestigationTask {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view investigation tasks");
    };
    investigationTasks.get(taskId);
  };

  public query ({ caller }) func getAllInvestigationTasks() : async [InvestigationTask] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view investigation tasks");
    };
    investigationTasks.values().toArray().sort();
  };

  public shared ({ caller }) func logOfficerActivity(
    activityType : ActivityType,
    description : Text,
    timestamp : Text
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can log officer activities");
    };
    let id = officerActivityLogs.size() + 1;
    let newLog : OfficerActivityLog = {
      id;
      officer = caller;
      activityType;
      description;
      timestamp;
    };
    officerActivityLogs.add(id, newLog);
    id;
  };

  public query ({ caller }) func getOfficerActivityLog(logId : Nat) : async ?OfficerActivityLog {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view officer activity logs");
    };
    officerActivityLogs.get(logId);
  };

  public query ({ caller }) func getAllOfficerActivityLogs() : async [OfficerActivityLog] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view officer activity logs");
    };
    officerActivityLogs.values().toArray().sort();
  };

  public shared ({ caller }) func addEvidenceItem(
    caseId : Nat,
    description : Text,
    dateCollected : Text,
    evidenceType : { #physical; #digital; #testimonial }
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add evidence items");
    };
    let id = evidenceItems.size() + 1;
    let newEvidence : EvidenceItem = {
      id;
      caseId;
      description;
      collectedBy = caller;
      dateCollected;
      evidenceType;
      status = #inCustody;
    };
    evidenceItems.add(id, newEvidence);
    id;
  };

  public shared ({ caller }) func updateEvidenceStatus(evidenceId : Nat, status : EvidenceStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update evidence status");
    };
    let existingEvidence = switch (evidenceItems.get(evidenceId)) {
      case (?e) { e };
      case (null) { Runtime.trap("Evidence item not found") };
    };
    let updatedEvidence = {
      existingEvidence with
      status;
    };
    evidenceItems.add(evidenceId, updatedEvidence);
  };

  public query ({ caller }) func getEvidenceItem(evidenceId : Nat) : async ?EvidenceItem {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view evidence items");
    };
    evidenceItems.get(evidenceId);
  };

  public query ({ caller }) func getAllEvidenceItems() : async [EvidenceItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view evidence items");
    };
    evidenceItems.values().toArray().sort();
  };

  // Investigation Records
  public type InvestigationRecord = {
    id : Nat;
    title : Text;
    description : Text;
    createdBy : Principal;
    createdAt : Text;
    attachments : [Storage.ExternalBlob];
  };

  type AccusedDatabase = {
    id : Nat;
    name : Text;
    status : AccusedStatus;
    firDetails : Text;
    seizureDetails : Text;
    ndpsQuantity : Text;
    policeStation : Text;
    createdAt : Text;
    updatedAt : Text;
    investigationRecords : [InvestigationRecord];
  };

  type AccusedStatus = {
    #inJail;
    #onBail;
    #absconded;
  };

  var accusedRecords = Map.empty<Nat, AccusedDatabase>();
  var investigationRecords = Map.empty<Nat, InvestigationRecord>();

  public shared ({ caller }) func createAccused(
    name : Text,
    status : AccusedStatus,
    firDetails : Text,
    seizureDetails : Text,
    ndpsQuantity : Text,
    policeStation : Text
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create accused records");
    };
    let id = accusedRecords.size() + 1;
    let newAccused = {
      id;
      name;
      status;
      firDetails;
      seizureDetails;
      ndpsQuantity;
      policeStation;
      createdAt = "current_timestamp";
      updatedAt = "current_timestamp";
      investigationRecords = [];
    };
    accusedRecords.add(id, newAccused);
    id;
  };

  public shared ({ caller }) func updateAccused(
    accusedId : Nat,
    name : Text,
    status : AccusedStatus,
    firDetails : Text,
    seizureDetails : Text,
    ndpsQuantity : Text,
    policeStation : Text
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update accused records");
    };
    let accused = switch (accusedRecords.get(accusedId)) {
      case (?a) { a };
      case (null) { Runtime.trap("Accused record not found") };
    };
    let updatedAccused = {
      accused with
      name;
      status;
      firDetails;
      seizureDetails;
      ndpsQuantity;
      policeStation;
      updatedAt = "current_timestamp";
    };
    accusedRecords.add(accusedId, updatedAccused);
  };

  public shared ({ caller }) func addInvestigationRecordToAccused(
    accusedId : Nat,
    title : Text,
    description : Text,
    attachments : ?[Storage.ExternalBlob]
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add investigation records");
    };
    let recordId = investigationRecords.size() + 1;
    let newRecord = {
      id = recordId;
      title;
      description;
      createdBy = caller;
      createdAt = "current_timestamp";
      attachments = switch (attachments) {
        case (null) { [] };
        case (?a) { a };
      };
    };
    investigationRecords.add(recordId, newRecord);

    let accused = switch (accusedRecords.get(accusedId)) {
      case (?a) { a };
      case (null) { Runtime.trap("Accused record not found") };
    };
    let existingRecords = List.fromArray<InvestigationRecord>(accused.investigationRecords);
    existingRecords.add(newRecord);

    let updatedAccused = {
      accused with
      investigationRecords = existingRecords.toArray();
      updatedAt = "current_timestamp";
    };
    accusedRecords.add(accusedId, updatedAccused);
  };

  public query ({ caller }) func getAccusedRecordsByStatus(status : AccusedStatus) : async [AccusedDatabase] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view accused records");
    };
    let result = List.empty<AccusedDatabase>();
    for ((_, record) in accusedRecords.entries()) {
      if (record.status == status) {
        result.add(record);
      };
    };
    result.toArray();
  };

  public query ({ caller }) func getAllAccusedRecords() : async [AccusedDatabase] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view accused records");
    };
    accusedRecords.values().toArray();
  };

  public query ({ caller }) func getAccusedRecord(accusedId : Nat) : async ?AccusedDatabase {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view accused records");
    };
    accusedRecords.get(accusedId);
  };

  public query ({ caller }) func searchAccusedRecords(
    nameQuery : ?Text,
    firQuery : ?Text,
    policeStationQuery : ?Text,
    statusFilter : ?AccusedStatus
  ) : async [AccusedDatabase] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can search accused records");
    };
    let result = List.empty<AccusedDatabase>();
    for ((_, record) in accusedRecords.entries()) {
      var matches = true;
      
      switch (nameQuery) {
        case (?name) {
          if (not record.name.contains(#text name)) {
            matches := false;
          };
        };
        case (null) {};
      };
      
      switch (firQuery) {
        case (?fir) {
          if (not record.firDetails.contains(#text fir)) {
            matches := false;
          };
        };
        case (null) {};
      };
      
      switch (policeStationQuery) {
        case (?station) {
          if (not record.policeStation.contains(#text station)) {
            matches := false;
          };
        };
        case (null) {};
      };
      
      switch (statusFilter) {
        case (?status) {
          if (record.status != status) {
            matches := false;
          };
        };
        case (null) {};
      };
      
      if (matches) {
        result.add(record);
      };
    };
    result.toArray();
  };
};
