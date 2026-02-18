import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface InvestigationRecord {
    id: bigint;
    title: string;
    createdAt: string;
    createdBy: Principal;
    description: string;
    attachments: Array<ExternalBlob>;
}
export interface InvestigationTask {
    id: bigint;
    status: TaskStatus;
    description: string;
    deadline: string;
    caseId: bigint;
    assignedOfficer: Principal;
}
export interface AccusedDatabase {
    id: bigint;
    ndpsQuantity: string;
    status: AccusedStatus;
    firDetails: string;
    seizureDetails: string;
    name: string;
    createdAt: string;
    policeStation: string;
    investigationRecords: Array<InvestigationRecord>;
    updatedAt: string;
}
export interface OfficerActivityLog {
    id: bigint;
    activityType: ActivityType;
    description: string;
    timestamp: string;
    officer: Principal;
}
export interface EvidenceItem {
    id: bigint;
    status: EvidenceStatus;
    description: string;
    collectedBy: Principal;
    dateCollected: string;
    caseId: bigint;
    evidenceType: Variant_testimonial_physical_digital;
}
export interface Case {
    id: bigint;
    status: CaseStatus;
    title: string;
    description: string;
    dateOpened: string;
    involvedOfficers: Array<Principal>;
    leadInvestigator: Principal;
}
export interface UserProfile {
    name: string;
    rank: string;
    department: string;
    badgeNumber: string;
}
export enum AccusedStatus {
    absconded = "absconded",
    inJail = "inJail",
    onBail = "onBail"
}
export enum ActivityType {
    surveillance = "surveillance",
    evidenceCollection = "evidenceCollection",
    arrest = "arrest",
    patrol = "patrol",
    witnessInterview = "witnessInterview"
}
export enum CaseStatus {
    closed = "closed",
    open = "open",
    underInvestigation = "underInvestigation",
    archived = "archived"
}
export enum EvidenceStatus {
    inCustody = "inCustody",
    analyzed = "analyzed",
    returned = "returned",
    destroyed = "destroyed"
}
export enum TaskStatus {
    pending = "pending",
    completed = "completed",
    overdue = "overdue",
    inProgress = "inProgress"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_testimonial_physical_digital {
    testimonial = "testimonial",
    physical = "physical",
    digital = "digital"
}
export interface backendInterface {
    addEvidenceItem(caseId: bigint, description: string, dateCollected: string, evidenceType: Variant_testimonial_physical_digital): Promise<bigint>;
    addInvestigationRecordToAccused(accusedId: bigint, title: string, description: string, attachments: Array<ExternalBlob> | null): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createAccused(name: string, status: AccusedStatus, firDetails: string, seizureDetails: string, ndpsQuantity: string, policeStation: string): Promise<bigint>;
    createCase(title: string, description: string, leadInvestigator: Principal, dateOpened: string): Promise<bigint>;
    createInvestigationTask(caseId: bigint, description: string, assignedOfficer: Principal, deadline: string): Promise<bigint>;
    getAccusedRecord(accusedId: bigint): Promise<AccusedDatabase | null>;
    getAccusedRecordsByStatus(status: AccusedStatus): Promise<Array<AccusedDatabase>>;
    getAllAccusedRecords(): Promise<Array<AccusedDatabase>>;
    getAllCases(): Promise<Array<Case>>;
    getAllEvidenceItems(): Promise<Array<EvidenceItem>>;
    getAllInvestigationTasks(): Promise<Array<InvestigationTask>>;
    getAllOfficerActivityLogs(): Promise<Array<OfficerActivityLog>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCase(caseId: bigint): Promise<Case | null>;
    getEvidenceItem(evidenceId: bigint): Promise<EvidenceItem | null>;
    getInvestigationTask(taskId: bigint): Promise<InvestigationTask | null>;
    getOfficerActivityLog(logId: bigint): Promise<OfficerActivityLog | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    logOfficerActivity(activityType: ActivityType, description: string, timestamp: string): Promise<bigint>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchAccusedRecords(nameQuery: string | null, firQuery: string | null, policeStationQuery: string | null, statusFilter: AccusedStatus | null): Promise<Array<AccusedDatabase>>;
    updateAccused(accusedId: bigint, name: string, status: AccusedStatus, firDetails: string, seizureDetails: string, ndpsQuantity: string, policeStation: string): Promise<void>;
    updateCaseStatus(caseId: bigint, status: CaseStatus): Promise<void>;
    updateEvidenceStatus(evidenceId: bigint, status: EvidenceStatus): Promise<void>;
    updateTaskStatus(taskId: bigint, status: TaskStatus): Promise<void>;
}
