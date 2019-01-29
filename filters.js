function dropByUid(uid) {
    return [ `$..VEVENT[?(@.UID=="${uid}")]`, () => null ]
}

function dropBySummary(summary) {
    return [ `$..VEVENT[?(@.SUMMARY=="${summary}")]`, () => undefined ]
}


// Change location to real address
function huxleyfy(number) {
    return [ 
        `$..VEVENT[?(@.LOCATION.includes("HXLY ${number}"))].LOCATION`, 
        () => `Room ${number}\\, Huxley Building\\, Kensington\\, London\\, SW7 2AZ`
    ]
}

module.exports = [
    // Change the name of the calendar
    [ "$.VCALENDAR..[\"X-WR-CALNAME\"]", () => "Timetable" ],

    // Drop specific summaries
    dropBySummary("CO395 Introduction to Machine Learning (alternative session)"),
    dropBySummary("CO Careers Talk (details TBC)"),
    dropBySummary("CO318 Custom Computing"),
    dropBySummary("CO Machine Learning Seminar *dates\\/room to be advised*"),
    dropBySummary("CO304 Logic-Based Learning"),
    dropBySummary("CO395 Introduction to Machine Learning"),
    dropBySummary("CO338 Pervasive Computing"),
    dropBySummary("CO333 Robotics"),
    dropBySummary("CO Machine Learning Seminar"),
    dropBySummary("CO Applications of Computing in Industry"),
    dropBySummary("EIE2 Computer Architecture"),
    dropBySummary("CO Careers-1-2-1 (Huxley 219A)"),
    dropBySummary("CO Horizons Courses Years 3\\/4"),
    dropBySummary("CO572 Advanced Databases"),
    dropBySummary("CO343 Operations Research"),
    dropBySummary("CO iPr0gram (Imperial Programming Lectures)"),
    [ "$..VEVENT[?(@.SUMMARY.startsWith(\"CO Careers Talk\"))]", () => null ],

    // Drop specific UIDs
    dropByUid("230c99e5-2dec-43b9-bcd6-cb2561f95e30"),
    dropByUid("3e764d02-dd20-4b90-9e52-eaf55d3d2305"),
    dropByUid("975eca92-975d-4e84-809b-2a104370d3ef"),
    dropByUid("5250d3bf-9204-4dfe-9f49-d7520930da02"),
    dropByUid("d9759495-62d0-4490-9967-9fa811da3dd4"),
    dropByUid("b6ce43b8-82d6-42f8-8005-2e04184e0814"),
    dropByUid("bd6c87dc-3ddd-4798-8748-4f2ae8eef4ec"),
    dropByUid("ed7b789f-c189-4024-b006-c0b631cab3b3"),
    dropByUid("473944b2-9042-40da-9acb-df45075482b0"),
    dropByUid("3a3be4ba-ce7e-4fec-a3d8-c9e5d78036c5"),
    dropByUid("e59d49bd-ba74-438f-a1f2-f252a837c75c"),
    dropByUid("173a845c-fdbb-4bc9-9b1a-5e032ef58a28"),
    dropByUid("b867e2d7-f089-4d7f-8345-d43e3af64b49"),
    dropByUid("c17d9e0a-d422-46c0-9bab-0714903ec2b4"),
    dropByUid("00e55ce4-1027-4ec0-a2ca-e92a9c6d5164"),
    dropByUid("b2fa9d67-db70-4c9c-ad2e-87a3e1fe290c"),
    dropByUid("b8bb0fca-24e9-40f2-aa33-552a8e0668b0"),
    dropByUid("7a3a3a3d-fbee-4afe-a9a2-4c60d3ef8419"),

    // Append (Lab) to slots in the lab
    [ "$..VEVENT[?(@.LOCATION.includes(\"HXLY 219\")||@.LOCATION.includes(\"HXLY 202\")||@.LOCATION.includes(\"HXLY 206\"))].SUMMARY", x => x + " (Lab)" ],

    // Fix the huxley address for events
    huxleyfy("139"),
    huxleyfy("140"),
    huxleyfy("144"),
    huxleyfy("145"),
    huxleyfy("308"),
    huxleyfy("311"),
    huxleyfy("340"),
    // Lab rooms for any events that are labs-only (after other rooms so 219 does not occur)
    huxleyfy("219"),
    huxleyfy("202"),
    huxleyfy("206"),
]