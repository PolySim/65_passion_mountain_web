"use client";

import { useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormFile from "@/components/form/formFile";
import { Button } from "@/components/ui/button";
import { uploadImages } from "@/utils/images/imagesAction";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const EditImages = () => {
  const params = useParams();
  const hikingId = params.hikingId as string;
  const { toast } = useToast();
  const formSchema = z.object({
    images: z
      .instanceof(FileList)
      .optional()
      .refine(
        (files) => {
          if (!files || files.length === 0) return false;
          return Array.from(files).every((file) =>
            ACCEPTED_IMAGE_TYPES.includes(file.type),
          );
        },
        { message: "Le type de fichier n'est pas accepté" },
      ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      images: undefined,
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!data.images) return;
    const formData = new FormData();
    Array.from(data.images).forEach((file) => {
      formData.append("images", file);
    });
    await uploadImages(formData, hikingId).then((res) => {
      if (res === "error") {
        toast({
          title: "Erreur lors de l'envoi des images",
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
          name="images"
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          disabled={form.formState.isSubmitting}
          label="Images"
          multiple
        />
        <Button disabled={form.formState.isSubmitting} type="submit">
          Ajouter
        </Button>
      </form>
    </Form>
  );
};

export default EditImages;
