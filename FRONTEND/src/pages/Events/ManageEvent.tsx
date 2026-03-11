import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  getEventById,
  approveParticipant,
  rejectParticipant,
} from "@/services/event.service";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


export default function MangeEvent() {
  const { id } = useParams();
 

  
  const { data: event, refetch } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEventById(id as string),
    enabled: !!id,
  });

  const approveMutation = useMutation({
    mutationFn: ({ eventId, userId }: any) =>
      approveParticipant(eventId, userId),
    onSuccess: () => refetch(),
  });

  const rejectMutation = useMutation({
    mutationFn: ({ eventId, userId }: any) =>
      rejectParticipant(eventId, userId),
    onSuccess: () => refetch(),
  });





  const pending = event?.pendingParticipants || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-10 space-y-8"
    >

      <Card className="shadow-lg">
        <CardContent className="p-8 space-y-6">
          <h2 className="text-xl font-semibold">Pending Join Requests</h2>

          {pending.length === 0 && (
            <p className="text-muted-foreground text-sm">No pending requests</p>
          )}

          <div className="space-y-3">
            {pending.map((user: any) => (
              <div
                key={user._id}
                className="flex items-center justify-between border rounded-lg p-4"
              >
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() =>
                      approveMutation.mutate({
                        eventId: event._id,
                        userId: user._id,
                      })
                    }
                  >
                    Approve
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() =>
                      rejectMutation.mutate({
                        eventId: event._id,
                        userId: user._id,
                      })
                    }
                  >
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
