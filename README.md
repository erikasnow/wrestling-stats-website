## Erika Snow | Wrestling Tournament Stats
This project is designed to allow the user to quickly input the results from a match in a wrestling tournament and keep track of the winners. The project also allows for these results to be updated and deleted as necessary. This could be useful, as wrestling tournaments are very fast-paced, with little time between matches, and generally multiple matches at once. With a single database to keep track of all of these matches, this web application could assist the tournament facilitators by automatically updating them on the status of each match. This would be much faster than the current system, where the facilitators are required to check in with the score keepers after each match ends. Ultimately, this could prevent the tounament from getting behind schedule. 

## Technical Achievements
- **Tech Achievement 1**: Shown in `style.css` and `crud.js`, buttons unnecessary to the current task are disabled to prevent user errors
- **Tech Achievement 2**: Shown in `extra.js`, I added functionality to look up a specific wrestler and recieve the total number of game points they have earned so far. This is done through an additional http request where the name of the wrestler is sent in a POST. Then the server searches through the database for matches where the specified wrestler won, and grabs the type of win for each of those. The server then tallies up the total point for the wrestler based on the type of win (6 pts for a pin, 5 pts for a tech pin, 4 pts for a major, 3 pts for a minor, 0 for everything else). This information is then returned to the client to display in a table. This functionality was also designed to be scalable, so that more information on the specified wrestler can be returned, if desired.

## Design/Evaluation Achievements
- **Design Achievement 1**: Shown in `style.css` and `crud.js`, buttons unnecessary to the current task are disabled to prevent user errors
- **Design Achievement 2**: Shown in `style.css`, every other row in the table is shaded to improve readability
- **Design Achievement 3**: Shown in `style.css`, classes are used to force each column in all of the tables to line up. This also improves readability
- **Design Achievement 4**: Shown in `index.html` and `crud.js`, the create and update tables are hidden until needed, reducing clutter on the screen
