// export const state = {
//   data: {},
// };

// export const loadMovies = async function () {
//   try {
//     const fetchPro = await fetch(
//       "https://online-movie-database.p.rapidapi.com/auto-complete?q=game%20",
//       options
//     );
//     const res = await fetchPro.json();
//     const data = res.d;
//     console.log(data);
//     console.log(data[0].id);
//     state.data.map((item) => {
//       const name = item.l;
//       const catergory = item.q;
//       const rank = item.rank;
//       const id = item.id;
//       const year = item.y;
//       if (item.i) poster = item.i.imageUrl;
//       //<h4>rank: ${rank ? rank : "not rated"}</h4>
//     });
//     if (!fetchPro.ok) throw new Error(`Movie can't be found! `);
//   } catch (err) {
//     console.error(err);
//   }
// };
