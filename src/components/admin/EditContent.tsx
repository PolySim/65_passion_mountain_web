"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useParams } from "next/navigation";
import { Form } from "@/components/ui/form";
import { updateContent } from "@/utils/hiking/hikingAction";
import { useToast } from "@/components/ui/use-toast";
import FormInput from "@/components/form/formInput";
import { Button } from "@/components/ui/button";

const EditContent = ({
  description,
  indication,
}: {
  description: string;
  indication: string;
}) => {
  const params = useParams();
  const hikingId = params.hikingId as string;
  const { toast } = useToast();

  const formSchema = z.object({
    description: z.string(),
    indication: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      description,
      indication,
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await updateContent({
      description: data.description,
      indication: data.indication,
      hikingId,
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
          description: "Les informations ont été modifiées avec succès",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-4 space-y-4">
        <div className="space-y-4">
          <h6 className="ml-4 text-green-dark border-b-2 border-b-green-dark w-fit font-bold pb-2">
            Description
          </h6>
          <FormInput
            control={form.control}
            name="description"
            type="text-area"
          />
        </div>
        <div>
          <h6 className="ml-4 text-green-dark border-b-2 border-b-green-dark w-fit font-bold pb-2">
            Indication
          </h6>
          <FormInput
            control={form.control}
            name="indication"
            type="text-area"
          />
        </div>
        <Button type="submit">Enregistrer</Button>
      </form>
    </Form>
  );
};

export default EditContent;
