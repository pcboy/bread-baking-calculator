import * as React from "react";
import styled from "styled-components";

export const STips = styled.div`
  margin: 0 auto;
  margin-top: 1rem;
  margin-bottom: 4rem;
  max-width: 35rem;

  margin-bottom: 0.5rem;

  font-size: 0.81rem;

  span.underlined {
    border-bottom: 1px dashed #aaa;
    display: inline;
    padding-left: 0.1rem;
    padding-right: 0.2rem;
  }
`;

export const Tips: React.FC = () => (
  <STips>
    <b>Pro Tips: </b>
    <ul>
      <li>
        - Everything <span className="underlined">underlined</span>
        can be freely edited.
      </li>
      <li>
        - State of the calculator stays in the URL: you can bookmark/share your
        recipes.
      </li>
    </ul>
  </STips>
);
