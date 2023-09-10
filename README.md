# Troop 15 Camping

Server and react web client to communicate and extend the [TroopTrack](https://www.trooptrack.com/) [API](https://trooptrack.com/api/swagger). 

# Projects
## springboot-camping-server
This server authenticates to MongoDB & the TroopTrack API and coordinates actions between the two, as well as provides all data for the react-ui application
## react-ui
Renders a UI that allows the user to login, synchronize users from Troop Track, and update custom fields in the MongoDB for each user.


# Purpose
The way we run our troop's finances and billing does not work perfectly
with the way trooptrack is setup to collect from families. 
This project was designed to harness troop track for information it provides:

 * listing of scouts and their families
 * campouts and other events in the troop calendar
 * tracking of who attended which campout

# Extension
I have not found a way to store user-defined attributes in the
TroopTrack database directly, so instead I collect IDs from trooptrack
and map them onto records in my own database. Currently 2 attributes
are contemplated:

 * active -- a boolean tracking whether the scout or adult is still actively participating
 *  annual_fee - a boolean tracking whether the scout paid our annual camping fee, or prefers to be billed per-campout.
