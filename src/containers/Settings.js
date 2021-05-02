import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import config from "../config";
import "./Settings.css";

export default function Settings() {
  const history = useHistory();


return (
  <div className="Settings">
    <LinkContainer to="/settings/email">
      <LoaderButton block bsSize="large">
        Change Email
      </LoaderButton>
    </LinkContainer>
    <LinkContainer to="/settings/password">
      <LoaderButton block bsSize="large">
        Change Password
      </LoaderButton>
    </LinkContainer>
    <hr />
  </div>
);
}