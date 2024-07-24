"use client";

import { Button } from "@/components/ui/button";
import { ApiAuthAuth0 } from "@/routes";
import React from "react";

const Logout = () => {
  return (
    <ApiAuthAuth0.Link auth0="logout" legacyBehavior>
      <Button variant="secondary" weight="bold">
        Deconnexion
      </Button>
    </ApiAuthAuth0.Link>
  );
};

export default Logout;
