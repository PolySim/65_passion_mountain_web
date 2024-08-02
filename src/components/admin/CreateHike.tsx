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

const CreateHike = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-fit">
          Nouvelle activité
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nouvelle activité</DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button type="button" variant="destructive">
              Annuler
            </Button>
          </DialogClose>
          <Button type="submit">Ajouter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateHike;
