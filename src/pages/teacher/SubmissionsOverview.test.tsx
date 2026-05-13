// SubmissionsOverview.test.tsx

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SubmissionsOverview from "./teacherviewsubmissions"

function getFirstNames() {
  const rows = screen.getAllByRole("row").slice(1);

  return rows.map(
    (row) => within(row).getAllByRole("cell")[0].textContent
  );
}

describe("SubmissionsOverview sorting", () => {
  test("sorts by name", async () => {
    const user = userEvent.setup();

    render(<SubmissionsOverview />);

    await user.selectOptions(screen.getByLabelText(/sort by/i), "name");

    expect(getFirstNames()).toEqual([
        "Alice",
    "David",
    "Emily",
    "John",
    "Mark",
    "Sara",
    ]);
  });
});