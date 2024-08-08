"use client";

import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormFile from "@/components/form/formFile";
import { Button } from "../ui/button";
import { uploadGPX } from "@/utils/hiking/hikingAction";
import { useToast } from "@/components/ui/use-toast";

const EditGpx = () => {
  const params = useParams();
  const hikingId = params.hikingId as string;
  const { toast } = useToast();
  const formSchema = z.object({
    gpx: z
      .instanceof(File)
      .optional()
      .refine((file) => file !== undefined && file.name.endsWith(".gpx"), {
        message: "Le type doit être .gpx",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      gpx: undefined,
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    if (!data.gpx) return;
    formData.append("gpx", data.gpx);
    await uploadGPX({ file: formData, hikingId }).then((res) => {
      if (res === "error") {
        toast({
          title: "Erreur lors de la sauvegarde du fichier",
          description: "Veuillez réessayer",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormFile
          control={form.control}
          name="gpx"
          accept=".gpx"
          disabled={form.formState.isSubmitting}
          label="Fichier GPX"
        />
        <Button disabled={form.formState.isSubmitting} type="submit">
          Ajouter
        </Button>
      </form>
    </Form>
  );
};

export default EditGpx;
