import { Form } from "@remix-run/react";

export const Filter = () => {
  return (
    <Form>
      <label htmlFor="image-types">Image Type</label>
      <select name="image-types">
        <option>All Images</option>
        <option>Edited Images</option>
        <option>Unedited Images</option>
      </select>
    </Form>
  );
};
