import { useState } from 'react';
import { useGetAllTasks, useGetAllCases } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import LastUpdatedBadge from '../components/data/LastUpdatedBadge';
import ManualRefreshButton from '../components/data/ManualRefreshButton';
import TaskForm from '../components/tasks/TaskForm';
import { Plus, ListTodo } from 'lucide-react';
import { TaskStatus } from '../backend';

const statusColors: Record<TaskStatus, string> = {
  [TaskStatus.pending]: 'default',
  [TaskStatus.inProgress]: 'secondary',
  [TaskStatus.completed]: 'outline',
  [TaskStatus.overdue]: 'destructive',
};

export default function TasksPage() {
  const { data: tasks = [], dataUpdatedAt, isLoading, refetch } = useGetAllTasks();
  const { data: cases = [] } = useGetAllCases();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');

  const filteredTasks = statusFilter === 'all' ? tasks : tasks.filter((t) => t.status === statusFilter);

  const getCaseTitle = (caseId: bigint) => {
    const caseItem = cases.find((c) => c.id === caseId);
    return caseItem?.title || `Case #${caseId}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Investigation Tasks</h1>
          <p className="text-muted-foreground">Manage and track investigation tasks</p>
        </div>
        <div className="flex gap-2">
          <ManualRefreshButton onRefresh={refetch} isRefreshing={isLoading} />
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Filter:</span>
        <Button variant={statusFilter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('all')}>
          All
        </Button>
        <Button
          variant={statusFilter === TaskStatus.pending ? 'default' : 'outline'}
          size="sm"
          onClick={() => setStatusFilter(TaskStatus.pending)}
        >
          Pending
        </Button>
        <Button
          variant={statusFilter === TaskStatus.inProgress ? 'default' : 'outline'}
          size="sm"
          onClick={() => setStatusFilter(TaskStatus.inProgress)}
        >
          In Progress
        </Button>
        <Button
          variant={statusFilter === TaskStatus.completed ? 'default' : 'outline'}
          size="sm"
          onClick={() => setStatusFilter(TaskStatus.completed)}
        >
          Completed
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{filteredTasks.length} tasks</p>
        <LastUpdatedBadge dataUpdatedAt={dataUpdatedAt} isLoading={isLoading} />
      </div>

      {filteredTasks.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ListTodo className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">No tasks found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map((task) => (
            <Card key={task.id.toString()}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{task.description}</CardTitle>
                  <Badge variant={statusColors[task.status] as any}>{task.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Case: {getCaseTitle(task.caseId)}</p>
                  <p>Deadline: {task.deadline}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {showCreateForm && <TaskForm onClose={() => setShowCreateForm(false)} />}
    </div>
  );
}
