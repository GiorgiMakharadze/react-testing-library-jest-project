import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RepositoriesListItem from "./RepositoriesListItem";

function renderComponent() {
  const repository = {
    full_name: "facebook/react",
    language: "Javascript",
    description: "A js library",
    owner: {
      login: "facebook",
    },
    name: "react",
    html_url: "https://github.com/facebooks/react",
  };
  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );
  return { repository };
}

test("shows a link to the github homepage for this repository", async () => {
  const { repository } = renderComponent();

  //   screen.debug(); - ameebit shegvdidzlia shevamowmot rogoria html datas wamogebamde da mere
  //   await pause();
  //   screen.debug();

  await screen.findByRole("img", { name: /Javascript/i });

  const link = screen.getByRole("link", {
    name: /github repository/i,
  });
  expect(link).toHaveAttribute("href", repository.html_url);
});

test("shows a fileicon with te appropriate icon", async () => {
  renderComponent();

  const icon = await screen.findByRole("img", {
    name: /Javascript/i,
  });

  expect(icon).toHaveClass("js-icon");
});

test("shows a link to the code editor page", async () => {
  const { repository } = renderComponent();

  await screen.findByRole("img", {
    name: /Javascript/i,
  });
  const link = await screen.findByRole("link", {
    name: new RegExp(repository.owner.login),
  });

  expect(link).toHaveAttribute("href", `/repositories/${repository.full_name}`);
});

const pause = () => new Promise((resolve) => setTimeout(resolve, 100));
