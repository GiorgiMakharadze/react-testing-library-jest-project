import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomeRoute from "./HomeRoute";
import { createServer } from "../test/server";

createServer([
  {
    path: "/api/repositories",
    method: "get",
    res: (req, res, ctx) => {
      const language = req.url.searchParams.get("q").split("language:")[1];

      return {
        items: [
          { id: 1, full_name: `${language}_one` },
          { id: 2, full_name: `${language}_two` },
        ],
      };
    },
  },
]);

test("renders two links for each language", async () => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  );

  //Loop over each language
  const languages = [
    "javascript",
    "typescript",
    "rust",
    "go",
    "phyton",
    "java",
  ];
  //for each language, make sure we see two links
  for (let language of languages) {
    const links = await screen.findAllByRole("link", {
      name: new RegExp(`${language}_`),
    });
    expect(links).toHaveLength(2);
    //assert that links have the appropriate full name
    expect(links[0]).toHaveTextContent(`${language}_one`);
    expect(links[1]).toHaveTextContent(`${language}_two`);
    expect(links[0]).toHaveAttribute("href", `/repositories/${language}_one`);
    expect(links[1]).toHaveAttribute("href", `/repositories/${language}_two`);
  }
});

const pause = () => new Promise((resolve) => setTimeout(resolve, 100));

// import { render, screen } from "@testing-library/react";
// import { setupServer } from "msw/node";
// import { rest } from "msw";
// import { MemoryRouter } from "react-router-dom";
// import HomeRoute from "./HomeRoute";

// const handlers = [
//   rest.get("/api/repositories", (req, res, ctx) => {
//     //q aris query stringi magalitad /api/repositories?q=true an object romelic es query true
//     // const query = req.url.searchParams.get("q");
//     // console.log(query);
//     //2)AQ chven gvchirdeboda languagebis wamogeba amitom davyavit query
//     //da amoviget language
//     const language = req.url.searchParams.get("q").split("language:")[1];
//     console.log(language);
//     //am funcqciasaih vwert ra datas velodebit
//     return res(
//       ctx.json({
//         //chveni data am shemtxexvashi modis rogor item masivi da shingitaa objextebi datasi
//         // items: [
//         //   { id: 1, full_name: "full_name" },
//         //   { id: 2, full_name: "other name" },
//         // ],
//         //2)Da languagenis amogebis mere mivutie ukve swori saxelebi, ase  datestva ufro gagvidavildeba
//         items: [
//           { id: 1, full_name: `${language}_one` },
//           { id: 2, full_name: `${language}_two` },
//         ],
//       })
//     );
//   }),
// ];
// const server = setupServer(...handlers);

// beforeAll(() => {
//   //veunebit rom daiwye serveris datas mosmena
//   server.listen();
// });

// afterEach(() => {
//   //veubnebit rom reset each this handlers to there inital default state
//   server.resetHandlers();
// });

// afterAll(() => {
//   //veubnebit rom gaachere serveri
//   server.close();
// });

// //Viwyebt testsings
// test("renders two links for each language", async () => {
//   render(
//     <MemoryRouter>
//       <HomeRoute />
//     </MemoryRouter>
//   );
//   //amit isve vnaxet chveni hmtl rogoria datas wamogebi mere d amanadme
//   //   await pause;
//   //   screen.debug();

//   //Loop over each language
//   const languages = [
//     "javascript",
//     "typescript",
//     "rust",
//     "go",
//     "phyton",
//     "java",
//   ];
//   //for each language, make sure we see two links
//   for (let language of languages) {
//     const links = await screen.findAllByRole("link", {
//       name: new RegExp(`${language}_`),
//     });
//     expect(links).toHaveLength(2);
//     //assert that links have the appropriate full name
//     expect(links[0]).toHaveTextContent(`${language}_one`);
//     expect(links[1]).toHaveTextContent(`${language}_two`);
//     expect(links[0]).toHaveAttribute("href", `/repositories/${language}_one`);
//     expect(links[1]).toHaveAttribute("href", `/repositories/${language}_two`);
//   }
// });

// const pause = () => new Promise((resolve) => setTimeout(resolve, 100));
