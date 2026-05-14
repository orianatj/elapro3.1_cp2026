
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SubmissionsOverview from "./teacherviewsubmissions";

function getFirstNames() {
  const rows = screen.getAllByRole("row").slice(1);

  return rows.map(
    (row) => within(row).getAllByRole("cell")[0].textContent,
  );
}

describe("SubmissionsOverview", () => {
  test("renders all submissions initially", () => {
    render(<SubmissionsOverview />);

    const rows = screen.getAllByRole("row").slice(1);

    expect(rows).toHaveLength(6);
  });

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

  test("sorts by date", async () => {
    const user = userEvent.setup();

    render(<SubmissionsOverview />);

    await user.selectOptions(screen.getByLabelText(/sort by/i), "date");

    expect(getFirstNames()).toEqual([
      "Mark",
      "Alice",
      "Sara",
      "John",
      "Emily",
      "David",
    ]);
  });

  test("filters results by first name", async () => {
    const user = userEvent.setup();

    render(<SubmissionsOverview />);

    await user.type(
      screen.getByPlaceholderText(/search by student/i),
      "Alice",
    );

    const rows = screen.getAllByRole("row").slice(1);

    expect(rows).toHaveLength(1);
    expect(
      within(rows[0]).getAllByRole("cell")[0].textContent,
    ).toBe("Alice");
  });

  test("filters results by last name", async () => {
    const user = userEvent.setup();

    render(<SubmissionsOverview />);

    await user.type(
      screen.getByPlaceholderText(/search by student/i),
      "Patel",
    );

    const rows = screen.getAllByRole("row").slice(1);

    expect(rows).toHaveLength(1);
    expect(
      within(rows[0]).getAllByRole("cell")[0].textContent,
    ).toBe("John");
  });

  test("search is case insensitive", async () => {
    const user = userEvent.setup();

    render(<SubmissionsOverview />);

    await user.type(
      screen.getByPlaceholderText(/search by student/i),
      "eMiLy",
    );

    const rows = screen.getAllByRole("row").slice(1);

    expect(rows).toHaveLength(1);
    expect(
      within(rows[0]).getAllByRole("cell")[0].textContent,
    ).toBe("Emily");
  });

  test("shows no rows when search does not match", async () => {
    const user = userEvent.setup();

    render(<SubmissionsOverview />);

    await user.type(
      screen.getByPlaceholderText(/search by student/i),
      "Michael",
    );

    const rows = screen.getAllByRole("row").slice(1);

    expect(rows).toHaveLength(0);
  });

  test("can search and sort together", async () => {
    const user = userEvent.setup();

    render(<SubmissionsOverview />);

    await user.type(
      screen.getByPlaceholderText(/search by student/i),
      "a",
    );

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

