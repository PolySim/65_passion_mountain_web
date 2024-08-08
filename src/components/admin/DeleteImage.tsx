"use client";

import { deleteImage } from "@/utils/images/imagesAction";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DeleteImage = ({
  image,
  hikingId,
  isMain,
}: {
  image: number;
  hikingId: string;
  isMain: boolean;
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const { toast } = useToast();

  const onDelete = async () => {
    setIsClicked(true);
    await deleteImage({ hikingId, imageId: image }).then((res) => {
      if (res === "error") {
        toast({
          title: "Erreur",
          description:
            "Une erreur est survenue lors de la suppression de l'image",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger disabled={isMain} asChild>
        <Button variant="destructive" size="icon" disabled={isMain}>
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer l&apos;image</DialogTitle>
          <DialogDescription>
            La suppression de l&apos;image est définitive. Veuillez confirmer
            votre choix.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={isClicked}
            onClick={onDelete}
            type="submit"
            variant="destructive"
          >
            Supprimer
          </Button>
          <DialogClose asChild>
            <Button disabled={isClicked} variant="outline">
              Annuler
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteImage;
