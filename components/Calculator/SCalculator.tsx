import styled from "styled-components";

export const SCalculator = styled.div`
  margin: 0 auto;
  margin-top: 6rem;
  margin-bottom: 5rem;
  max-width: 35rem;
  padding: 3rem;
  border: 2px dashed #afafaf;

  h1 {
    text-align: center;
    font-weight: bold;
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  .text-right {
    text-align: right;
  }

  .editable {
    border-bottom: 1px dashed #aaa;
    margin-top: 0.4rem;
  }

  .weight {
    font-weight: bold;
    text-align: right;
  }
`;
