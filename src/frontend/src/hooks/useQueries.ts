import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type {
  Case,
  InvestigationTask,
  OfficerActivityLog,
  EvidenceItem,
  UserProfile,
  CaseStatus,
  TaskStatus,
  EvidenceStatus,
  ActivityType,
  Variant_testimonial_physical_digital,
  AccusedDatabase,
  AccusedStatus,
  UserRole,
  ExternalBlob,
} from '../backend';
import { Principal } from '@dfinity/principal';

// User Profile Queries
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Authorization Queries
export function useGetCallerUserRole() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<UserRole>({
    queryKey: ['callerUserRole'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useAssignCallerUserRole() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { user: Principal; role: UserRole }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.assignCallerUserRole(data.user, data.role);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['callerUserRole'] });
      queryClient.invalidateQueries({ queryKey: ['isCallerAdmin'] });
    },
  });
}

// Cases Queries
export function useGetAllCases() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Case[]>({
    queryKey: ['cases'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCases();
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 10000, // Poll every 10 seconds
  });
}

export function useGetCase(caseId: bigint | undefined) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Case | null>({
    queryKey: ['case', caseId?.toString()],
    queryFn: async () => {
      if (!actor || !caseId) return null;
      return actor.getCase(caseId);
    },
    enabled: !!actor && !actorFetching && !!caseId,
    refetchInterval: 10000,
  });
}

export function useCreateCase() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      leadInvestigator: Principal;
      dateOpened: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createCase(data.title, data.description, data.leadInvestigator, data.dateOpened);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
    },
  });
}

export function useUpdateCaseStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { caseId: bigint; status: CaseStatus }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateCaseStatus(data.caseId, data.status);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      queryClient.invalidateQueries({ queryKey: ['case', variables.caseId.toString()] });
    },
  });
}

// Tasks Queries
export function useGetAllTasks() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<InvestigationTask[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInvestigationTasks();
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 10000,
  });
}

export function useCreateTask() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      caseId: bigint;
      description: string;
      assignedOfficer: Principal;
      deadline: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createInvestigationTask(data.caseId, data.description, data.assignedOfficer, data.deadline);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

export function useUpdateTaskStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { taskId: bigint; status: TaskStatus }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateTaskStatus(data.taskId, data.status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

// Activity Logs Queries
export function useGetAllActivityLogs() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<OfficerActivityLog[]>({
    queryKey: ['activityLogs'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllOfficerActivityLogs();
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 10000,
  });
}

export function useLogActivity() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { activityType: ActivityType; description: string; timestamp: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.logOfficerActivity(data.activityType, data.description, data.timestamp);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activityLogs'] });
    },
  });
}

// Evidence Queries
export function useGetAllEvidence() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<EvidenceItem[]>({
    queryKey: ['evidence'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEvidenceItems();
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 10000,
  });
}

export function useAddEvidence() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      caseId: bigint;
      description: string;
      dateCollected: string;
      evidenceType: Variant_testimonial_physical_digital;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addEvidenceItem(data.caseId, data.description, data.dateCollected, data.evidenceType);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['evidence'] });
    },
  });
}

export function useUpdateEvidenceStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { evidenceId: bigint; status: EvidenceStatus }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateEvidenceStatus(data.evidenceId, data.status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['evidence'] });
    },
  });
}

// Accused Database Queries
export function useGetAllAccusedRecords() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<AccusedDatabase[]>({
    queryKey: ['accusedRecords'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAccusedRecords();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetAccusedRecordsByStatus(status: AccusedStatus | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<AccusedDatabase[]>({
    queryKey: ['accusedRecords', 'byStatus', status],
    queryFn: async () => {
      if (!actor) return [];
      if (!status) return actor.getAllAccusedRecords();
      return actor.getAccusedRecordsByStatus(status);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetAccusedRecord(accusedId: bigint | undefined) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<AccusedDatabase | null>({
    queryKey: ['accusedRecord', accusedId?.toString()],
    queryFn: async () => {
      if (!actor || !accusedId) return null;
      return actor.getAccusedRecord(accusedId);
    },
    enabled: !!actor && !actorFetching && !!accusedId,
  });
}

export function useSearchAccusedRecords(
  nameQuery: string | null,
  firQuery: string | null,
  policeStationQuery: string | null,
  statusFilter: AccusedStatus | null
) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<AccusedDatabase[]>({
    queryKey: ['accusedRecords', 'search', nameQuery, firQuery, policeStationQuery, statusFilter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchAccusedRecords(nameQuery, firQuery, policeStationQuery, statusFilter);
    },
    enabled: !!actor && !actorFetching && (!!nameQuery || !!firQuery || !!policeStationQuery || !!statusFilter),
  });
}

export function useCreateAccused() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      status: AccusedStatus;
      firDetails: string;
      seizureDetails: string;
      ndpsQuantity: string;
      policeStation: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createAccused(
        data.name,
        data.status,
        data.firDetails,
        data.seizureDetails,
        data.ndpsQuantity,
        data.policeStation
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accusedRecords'] });
    },
  });
}

export function useUpdateAccused() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      accusedId: bigint;
      name: string;
      status: AccusedStatus;
      firDetails: string;
      seizureDetails: string;
      ndpsQuantity: string;
      policeStation: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateAccused(
        data.accusedId,
        data.name,
        data.status,
        data.firDetails,
        data.seizureDetails,
        data.ndpsQuantity,
        data.policeStation
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['accusedRecords'] });
      queryClient.invalidateQueries({ queryKey: ['accusedRecord', variables.accusedId.toString()] });
    },
  });
}

export function useAddInvestigationRecordToAccused() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      accusedId: bigint;
      title: string;
      description: string;
      attachments?: ExternalBlob[];
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addInvestigationRecordToAccused(
        data.accusedId,
        data.title,
        data.description,
        data.attachments || null
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['accusedRecords'] });
      queryClient.invalidateQueries({ queryKey: ['accusedRecord', variables.accusedId.toString()] });
    },
  });
}
