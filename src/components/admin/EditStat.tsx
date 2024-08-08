"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/form/formInput";
import { Button } from "@/components/ui/button";
import { updateStats } from "@/utils/hiking/hikingAction";
import { useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const EditStat = ({
  distance,
  duration,
  elevation,
}: {
  distance?: string;
  duration?: string;
  elevation?: string;
}) => {
  const params = useParams();
  const hikingId = params.hikingId as string;
  const formSchema = z.object({
    distance: z.string(),
    duration: z.string(),
    elevation: z.string(),
  });
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    values: {
      distance: distance ?? "0",
      duration: duration ?? "00h00",
      elevation: elevation ?? "0",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await updateStats({
      distance: data.distance,
      elevation: data.elevation,
      time: data.duration,
      hikingId: hikingId,
    }).then((res) => {
      if (res === "error") {
        toast({
          title: "Erreur",
          description:
            "Une erreur est survenue lors de la modification de l'activité",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Succès",
          description: "Les statistiques ont été modifiées avec succès",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between flex-wrap items-center gap-4 w-full px-4">
          <FormInput
            control={form.control}
            name="distance"
            label="Distance (en km)"
            type="number"
          />
          <FormInput
            control={form.control}
            name="elevation"
            label="Dénivelé (en m)"
            type="number"
          />
          <FormInput
            control={form.control}
            name="duration"
            label="Durée"
            type="text"
          />
        </div>
        <Button type="submit" className="ml-4 mt-2">
          Enregistrer
        </Button>
      </form>
    </Form>
  );
};

export default EditStat;
