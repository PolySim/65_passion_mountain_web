"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import FormInput from "@/components/form/formInput";
import FormSelect from "@/components/form/formSelect";
import { Difficulty } from "@/utils/difficulty/difficultyAction";
import { createHike, State } from "@/utils/hikes/hikesAction";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { updateHeader } from "@/utils/hiking/hikingAction";
import { useState } from "react";

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Le titre doit être au minimum de 3 caractères" }),
  difficulty: z.string().min(1),
  state: z.string().min(1),
});

const ModalHikeInformation = ({
  difficulties,
  states,
  information,
  hikingId,
}: {
  difficulties: Difficulty[];
  states: State[];
  information?: {
    title: string;
    difficulty: string;
    state: string;
  };
  hikingId?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const categoryId = params.categoryId as string;
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: information
      ? {
          title: information.title,
          difficulty: difficulties
            .find(
              (difficulty) => difficulty.difficulty === information.difficulty,
            )
            ?.id.toString() as string,
          state: states
            .find((state) => state.state === information.state)
            ?.id.toString() as string,
        }
      : {
          title: "",
          difficulty: difficulties[0]?.id.toString(),
          state: states[0]?.id.toString(),
        },
    resetOptions: {
      keepValues: true,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (information) {
      await updateHeader({
        ...data,
        hikingId: hikingId as string,
        lastState: information.state,
        categoryId,
      }).then((result) => {
        if (result === "error") {
          console.log("error");
          toast({
            title: "Erreur",
            description:
              "Une erreur est survenue lors de la modification de l'activité",
            variant: "destructive",
          });
        } else {
          setIsOpen((curr) => !curr);
        }
      });
    } else {
      await createHike({ ...data, categoryId }).then((result) => {
        if (result === "error") {
          toast({
            title: "Erreur",
            description:
              "Une erreur est survenue lors de la création de l'activité",
            variant: "destructive",
          });
        }
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen((curr) => !curr);
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-fit">
          {information ? "Modifier" : "Nouvelle activité"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[min(900px_,_95vw)]">
        <DialogHeader>
          <DialogTitle>
            {information ? "Modifier les informations" : "Nouvelle activité"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mb-4">
              <FormInput
                control={form.control}
                name="title"
                type="text"
                label="Titre"
                disabled={form.formState.isSubmitting}
              />
              <FormSelect
                control={form.control}
                name="difficulty"
                label="Difficulté"
                disabled={form.formState.isSubmitting}
                options={difficulties.map((difficulty) => ({
                  value: difficulty.id.toString(),
                  label: difficulty.difficulty,
                }))}
              />
              <FormSelect
                control={form.control}
                name="state"
                label="Massif"
                disabled={form.formState.isSubmitting}
                options={states.map((state) => ({
                  value: state.id.toString(),
                  label: state.state,
                }))}
              />
            </div>
            <DialogFooter className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button
                  disabled={form.formState.isSubmitting}
                  type="button"
                  variant="destructive"
                >
                  Annuler
                </Button>
              </DialogClose>
              <Button disabled={form.formState.isSubmitting} type="submit">
                {information ? "Modifier" : "Ajouter"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalHikeInformation;
