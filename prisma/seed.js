const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.school.createMany({
    data: [
      { name: "National University of Singapore", type: "university" },
      { name: "Nanyang Technological University", type: "university" },
      { name: "Singapore Management University", type: "university" },
      { name: "Singapore University of Social Sciences", type: "university" },
      { name: "Singapore Institute of Technology", type: "university" },
      {
        name: "Singapore University of Technology and Design",
        type: "university",
      },
      { name: "University of the Arts Singapore", type: "university" },
      { name: "Nanyang University", type: "university" },
      { name: "SIM University", type: "university" },
      { name: "Anderson Junior College", type: "Pre-University" },
      { name: "Anderson Serangoon Junior College", type: "Pre-University" },
      { name: "Anglo-Chinese Junior College", type: "Pre-University" },
      { name: "Catholic Junior College", type: "Pre-University" },
      { name: "Dunman High School (Pre-University)", type: "Pre-University" },
      { name: "Eunoia Junior College", type: "Pre-University" },
      {
        name: "Hwa Chong Institution (Pre-University)",
        type: "Pre-University",
      },
      { name: "Hwa Chong Junior College", type: "Pre-University" },
      { name: "Innova Junior College", type: "Pre-University" },
      { name: "Junior college (Singapore)", type: "Pre-University" },
      { name: "Jurong Junior College", type: "Pre-University" },
      { name: "Jurong Pioneer Junior College", type: "Pre-University" },
      { name: "Meridian Junior College", type: "Pre-University" },
      { name: "Nanyang Junior College", type: "Pre-University" },
      { name: "National Junior College", type: "Pre-University" },
      { name: "Raffles Institution (Pre-University)", type: "Pre-University" },
      { name: "Raffles Junior College", type: "Pre-University" },
      { name: "Saint Andrew's Junior College", type: "Pre-University" },
      { name: "St. Joseph's Institution, Singapore", type: "Pre-University" },
      { name: "Serangoon Junior College", type: "Pre-University" },
      { name: "Tampines Junior College", type: "Pre-University" },
      { name: "Tampines Meridian Junior College", type: "Pre-University" },
      { name: "Temasek Junior College", type: "Pre-University" },
      { name: "Victoria Junior College", type: "Pre-University" },
      { name: "Yishun Innova Junior College", type: "Pre-University" },
      { name: "Singapore Polytechnic", type: "Pre-University" },
      { name: "Temasek Polytechnic", type: "Pre-University" },
      { name: "Nanyang Polytechnic", type: "Pre-University" },
      { name: "Ngee Ann Polytechnic", type: "Pre-University" },
      { name: "Republic Polytechnic", type: "Pre-University" },
      { name: "ITE College Central", type: "Pre-University" },
      { name: "ITE College East", type: "Pre-University" },
      { name: "ITE College West", type: "Pre-University" },
      { name: "Admiralty Secondary School", type: "secondary" },
      { name: "Ahmad Ibrahim Secondary School", type: "secondary" },
      { name: "Anderson Secondary School", type: "secondary" },
      { name: "Anglican High School", type: "secondary" },
      { name: "Anglo-Chinese School (Barker Road)", type: "secondary" },
      { name: "Anglo-Chinese School (Independent)", type: "secondary" },
      { name: "Ang Mo Kio Secondary School", type: "secondary" },
      { name: "Assumption English School", type: "secondary" },
      { name: "Bartley Secondary School", type: "secondary" },
      { name: "Beatty Secondary School", type: "secondary" },
      { name: "Bedok Green Secondary School", type: "secondary" },
      { name: "Bedok South Secondary School", type: "secondary" },
      { name: "Bedok View Secondary School", type: "secondary" },
      { name: "Bendemeer Secondary School", type: "secondary" },
      { name: "Boon Lay Secondary School", type: "secondary" },
      { name: "Bowen Secondary School", type: "secondary" },
      { name: "Broadrick Secondary School", type: "secondary" },
      { name: "Bukit Batok Secondary School", type: "secondary" },
      { name: "Bukit Merah Secondary School", type: "secondary" },
      { name: "Bukit Panjang Government High School", type: "secondary" },
      { name: "Bukit View Secondary School", type: "secondary" },
      { name: "Catholic High School", type: "secondary" },
      { name: "Canberra Secondary School", type: "secondary" },
      { name: "Cedar Girls' Secondary School", type: "secondary" },
      { name: "Changkat Changi Secondary School", type: "secondary" },
      { name: "CHIJ Katong Convent (Secondary)", type: "secondary" },
      { name: "CHIJ Secondary (Toa Payoh)", type: "secondary" },
      { name: "CHIJ St. Joseph's Convent", type: "secondary" },
      { name: "CHIJ St. Nicholas Girls' School", type: "secondary" },
      { name: "CHIJ St. Theresa's Convent", type: "secondary" },
      { name: "Chua Chu Kang Secondary School", type: "secondary" },
      { name: "Christ Church Secondary School", type: "secondary" },
      { name: "Chung Cheng High School (Main)", type: "secondary" },
      { name: "Chung Cheng High School (Yishun)", type: "secondary" },
      { name: "Clementi Town Secondary School", type: "secondary" },
      { name: "Commonwealth Secondary School", type: "secondary" },
      { name: "Compassvale Secondary School", type: "secondary" },
      { name: "Crescent Girls' School", type: "secondary" },
      { name: "Damai Secondary School", type: "secondary" },
      { name: "Deyi Secondary School", type: "secondary" },
      { name: "Dunearn Secondary School", type: "secondary" },
      { name: "Dunman High School (Secondary)", type: "secondary" },
      { name: "Dunman Secondary School", type: "secondary" },
      { name: "East Spring Secondary School", type: "secondary" },
      { name: "Edgefield Secondary School", type: "secondary" },
      { name: "Evergreen Secondary School", type: "secondary" },
      { name: "Fairfield Methodist Secondary School", type: "secondary" },
      { name: "Fajar Secondary School", type: "secondary" },
      { name: "Fuchun Secondary School", type: "secondary" },
      { name: "Fuhua Secondary School", type: "secondary" },
      { name: "Gan Eng Seng School", type: "secondary" },
      { name: "Geylang Methodist School (Secondary)", type: "secondary" },
      { name: "Greendale Secondary School", type: "secondary" },
      { name: "Greenridge Secondary School", type: "secondary" },
      { name: "Guangyang Secondary School", type: "secondary" },
      { name: "Hai Sing Catholic School", type: "secondary" },
      { name: "Hillgrove Secondary School", type: "secondary" },
      { name: "Holy Innocents' High School", type: "secondary" },
      { name: "Hong Kah Secondary School", type: "secondary" },
      { name: "Hougang Secondary School", type: "secondary" },
      { name: "Hua Yi Secondary School", type: "secondary" },
      { name: "Hwa Chong Institution (Secondary)", type: "secondary" },
      { name: "Junyuan Secondary School", type: "secondary" },
      { name: "Jurong Secondary School", type: "secondary" },
      { name: "Jurong West Secondary School", type: "secondary" },
      { name: "Jurongville Secondary School", type: "secondary" },
      { name: "Juying Secondary School", type: "secondary" },
      { name: "Kent Ridge Secondary School", type: "secondary" },
      { name: "Kranji Secondary School", type: "secondary" },
      { name: "Kuo Chuan Presbyterian Secondary School", type: "secondary" },
      { name: "Loyang View Secondary School", type: "secondary" },
      { name: "Manjusri Secondary School", type: "secondary" },
      { name: "Maris Stella High School", type: "secondary" },
      { name: "Marsiling Secondary School", type: "secondary" },
      { name: "Mayflower Secondary School", type: "secondary" },
      { name: "Meridian Secondary School", type: "secondary" },
      { name: "Methodist Girls' School (Secondary)", type: "secondary" },
      { name: "Montfort Secondary School", type: "secondary" },
      { name: "Nan Chiau High School", type: "secondary" },
      { name: "Nan Hua High School", type: "secondary" },
      { name: "Nanyang Girls' High School", type: "secondary" },
      { name: "Naval Base Secondary School", type: "secondary" },
      { name: "New Town Secondary School", type: "secondary" },
      { name: "Ngee Ann Secondary School", type: "secondary" },
      { name: "North Vista Secondary School", type: "secondary" },
      { name: "Northbrooks Secondary School", type: "secondary" },
      { name: "Northland Secondary School", type: "secondary" },
      { name: "NUS High School of Mathematics and Science", type: "secondary" },
      { name: "Orchid Park Secondary School", type: "secondary" },
      { name: "Outram Secondary School", type: "secondary" },
      { name: "Pasir Ris Crest Secondary School", type: "secondary" },
      { name: "Pasir Ris Secondary School", type: "secondary" },
      { name: "Paya Lebar Methodist Girls' School", type: "secondary" },
      { name: "Pei Hwa Secondary School", type: "secondary" },
      { name: "Peicai Secondary School", type: "secondary" },
      { name: "Peirce Secondary School", type: "secondary" },
      { name: "Ping Yi Secondary School", type: "secondary" },
      { name: "Presbyterian High School", type: "secondary" },
      { name: "Punggol Secondary School", type: "secondary" },
      { name: "Queenstown Secondary School", type: "secondary" },
      { name: "Queensway Secondary School", type: "secondary" },
      { name: "Raffles Girls' School (Secondary)", type: "secondary" },
      { name: "Raffles Institution (Seconday)", type: "secondary" },
      { name: "Regent Secondary School", type: "secondary" },
      { name: "Riverside Secondary School", type: "secondary" },
      { name: "River Valley High School", type: "secondary" },
      { name: "St. Andrew's Secondary School", type: "secondary" },
      { name: "St. Patrick's School", type: "secondary" },
      { name: "School of Science and Technology", type: "secondary" },
      { name: "School of the Arts, Singapore", type: "secondary" },
      { name: "Sembawang Secondary School", type: "secondary" },
      { name: "Seng Kang Secondary School", type: "secondary" },
      { name: "Serangoon Garden Secondary School", type: "secondary" },
      { name: "Serangoon Secondary School", type: "secondary" },
      { name: "Shuqun Secondary School", type: "secondary" },
      { name: "Singapore Chinese Girls' School", type: "secondary" },
      { name: "Singapore Sports School", type: "secondary" },
      { name: "Springfield Secondary School", type: "secondary" },
      { name: "St. Anthony's Canossian Secondary School", type: "secondary" },
      { name: "St. Gabriel's Secondary School", type: "secondary" },
      { name: "St. Hilda's Secondary School", type: "secondary" },
      { name: "St. Margaret's Secondary School", type: "secondary" },
      { name: "St. Joseph's Institution", type: "secondary" },
      { name: "Swiss Cottage Secondary School", type: "secondary" },
      { name: "Tanglin Secondary School", type: "secondary" },
      { name: "Tampines Secondary School", type: "secondary" },
      { name: "Tanjong Katong Girls' School", type: "secondary" },
      { name: "Tanjong Katong Secondary School", type: "secondary" },
      { name: "Teck Whye Secondary School", type: "secondary" },
      { name: "Temasek Secondary School", type: "secondary" },
      { name: "Unity Secondary School", type: "secondary" },
      { name: "Victoria School", type: "secondary" },
      { name: "West Spring Secondary School", type: "secondary" },
      { name: "Westwood Secondary School", type: "secondary" },
      { name: "Whitley Secondary School", type: "secondary" },
      { name: "Woodgrove Secondary School", type: "secondary" },
      { name: "Woodlands Ring Secondary School", type: "secondary" },
      { name: "Woodlands Secondary School", type: "secondary" },
      { name: "Xinmin Secondary School", type: "secondary" },
      { name: "Yio Chu Kang Secondary School", type: "secondary" },
      { name: "Yishun Secondary School", type: "secondary" },
      { name: "Yishun Town Secondary School", type: "secondary" },
      { name: "Yuan Ching Secondary School", type: "secondary" },
      { name: "Yuhua Secondary School", type: "secondary" },
      { name: "Yusof Ishak Secondary School", type: "secondary" },
      { name: "Yuying Secondary School", type: "secondary" },
      { name: "Zhenghua Secondary School", type: "secondary" },
      { name: "Zhonghua Secondary School", type: "secondary" },
      { name: "Admiralty Primary School", type: "primary" },
      { name: "Ahmad Ibrahim Primary School", type: "primary" },
      { name: "Ai Tong School", type: "primary" },
      { name: "Alexandra Primary School", type: "primary" },
      { name: "Anchor Green Primary School", type: "primary" },
      { name: "Anderson Primary School", type: "primary" },
      { name: "Ang Mo Kio Primary School", type: "primary" },
      {
        name: "Anglo-Chinese School (Junior) - Boys only, Affiliated",
        type: "primary",
      },
      {
        name: "Anglo-Chinese School (Primary) - Boys only, Affiliated",
        type: "primary",
      },
      { name: "Angsana Primary School", type: "primary" },
      { name: "Beacon Primary School", type: "primary" },
      { name: "Bedok Green Primary School", type: "primary" },
      { name: "Bendemeer Primary School", type: "primary" },
      { name: "Blangah Rise Primary School", type: "primary" },
      { name: "Boon Lay Garden Primary School", type: "primary" },
      { name: "Bukit Panjang Primary School", type: "primary" },
      { name: "Bukit Timah Primary School", type: "primary" },
      { name: "Bukit View Primary School", type: "primary" },
      { name: "Canberra Primary School", type: "primary" },
      { name: "Canossa Catholic Primary School - Affiliated", type: "primary" },
      { name: "Cantonment Primary School", type: "primary" },
      { name: "Casuarina Primary School", type: "primary" },
      { name: "Catholic High School - Boys only, Affiliated", type: "primary" },
      { name: "Cedar Primary School", type: "primary" },
      { name: "Changkat Primary School", type: "primary" },
      {
        name: "CHIJ (Katong) Primary - Girls only, Affiliated",
        type: "primary",
      },
      { name: "CHIJ (Kellock) - Girls only, Affiliated", type: "primary" },
      {
        name: "CHIJ Our Lady of Good Counsel - Girls only, Affiliated",
        type: "primary",
      },
      {
        name: "CHIJ Our Lady of the Nativity - Girls only, Affiliated",
        type: "primary",
      },
      {
        name: "CHIJ Our Lady Queen of Peace - Girls only, Affiliated",
        type: "primary",
      },
      {
        name: "CHIJ Primary (Toa Payoh) - Girls only, Affiliated",
        type: "primary",
      },
      {
        name: "CHIJ St. Nicholas Girls' School - Girls only, Affiliated",
        type: "primary",
      },
      { name: "Chongfu School", type: "primary" },
      { name: "Chongzheng Primary School", type: "primary" },
      { name: "Chua Chu Kang Primary School", type: "primary" },
      { name: "Clementi Primary School", type: "primary" },
      { name: "Compassvale Primary School", type: "primary" },
      { name: "Concord Primary School", type: "primary" },
      { name: "Corporation Primary School", type: "primary" },
      { name: "Damai Primary School", type: "primary" },
      { name: "Dazhong Primary School", type: "primary" },
      { name: "De La Salle School - Affiliated", type: "primary" },
      { name: "East Spring Primary School", type: "primary" },
      { name: "Edgefield Primary School", type: "primary" },
      { name: "Elias Park Primary School", type: "primary" },
      { name: "Endeavour Primary School", type: "primary" },
      { name: "Eunos Primary School", type: "primary" },
      { name: "Evergreen Primary School", type: "primary" },
      {
        name: "Fairfield Methodist School (Primary) - Affiliated",
        type: "primary",
      },
      { name: "Farrer Park Primary School", type: "primary" },
      { name: "Fengshan Primary School", type: "primary" },
      { name: "Fern Green Primary School", type: "primary" },
      { name: "Fernvale Primary School", type: "primary" },
      { name: "First Toa Payoh Primary School", type: "primary" },
      { name: "Frontier Primary School", type: "primary" },
      { name: "Fuchun Primary School", type: "primary" },
      { name: "Fuhua Primary School", type: "primary" },
      { name: "Gan Eng Seng Primary School", type: "primary" },
      {
        name: "Geylang Methodist School (Primary) - Affiliated",
        type: "primary",
      },
      { name: "Gongshang Primary School", type: "primary" },
      { name: "Greendale Primary School", type: "primary" },
      { name: "Greenridge Primary School", type: "primary" },
      { name: "Greenwood Primary School", type: "primary" },
      { name: "Guangyang Primary School", type: "primary" },
      { name: "Haig Girls' School - Girls only", type: "primary" },
      { name: "Henry Park Primary School", type: "primary" },
      { name: "Holy Innocents' Primary School - Affiliated", type: "primary" },
      { name: "Hong Wen School", type: "primary" },
      { name: "Horizon Primary School", type: "primary" },
      { name: "Hougang Primary School", type: "primary" },
      { name: "Huamin Primary School", type: "primary" },
      { name: "Innova Primary School", type: "primary" },
      { name: "Jiemin Primary School", type: "primary" },
      { name: "Jing Shan Primary School", type: "primary" },
      { name: "Junyuan Primary School", type: "primary" },
      { name: "Jurong Primary School", type: "primary" },
      { name: "Jurong West Primary School", type: "primary" },
      { name: "Juying Primary School", type: "primary" },
      { name: "Keming Primary School", type: "primary" },
      { name: "Kheng Cheng School", type: "primary" },
      { name: "Kong Hwa School", type: "primary" },
      { name: "Kranji Primary School", type: "primary" },
      {
        name: "Kuo Chuan Presbyterian Primary School - Affiliated",
        type: "primary",
      },
      { name: "Lakeside Primary School", type: "primary" },
      { name: "Lianhua Primary School", type: "primary" },
      { name: "Maha Bodhi School - Affiliated", type: "primary" },
      {
        name: "Maris Stella High School - Boys only, Affiliated",
        type: "primary",
      },
      { name: "Marsiling Primary School", type: "primary" },
      { name: "Marymount Convent School - Girls only", type: "primary" },
      { name: "Mayflower Primary School", type: "primary" },
      { name: "Mee Toh School - Affiliated", type: "primary" },
      { name: "Meridian Primary School", type: "primary" },
      {
        name: "Methodist Girls' School (Primary) - Girls only, Affiliated",
        type: "primary",
      },
      {
        name: "Montfort Junior School - Boys only, Affiliated",
        type: "primary",
      },
      { name: "Nan Chiau Primary School", type: "primary" },
      { name: "Nan Hua Primary School", type: "primary" },
      { name: "Nanyang Primary School - Affiliated", type: "primary" },
      { name: "Naval Base Primary School", type: "primary" },
      { name: "New Town Primary School", type: "primary" },
      { name: "Ngee Ann Primary School - Affiliated", type: "primary" },
      { name: "North Spring Primary School", type: "primary" },
      { name: "North View Primary School", type: "primary" },
      { name: "North Vista Primary School", type: "primary" },
      { name: "Northland Primary School", type: "primary" },
      { name: "Northshore Primary School", type: "primary" },
      { name: "Northoaks Primary School", type: "primary" },
      { name: "Oasis Primary School", type: "primary" },
      { name: "Opera Estate Primary School", type: "primary" },
      { name: "Palm View Primary School", type: "primary" },
      { name: "Park View Primary School", type: "primary" },
      { name: "Pasir Ris Primary School", type: "primary" },
      {
        name: "Paya Lebar Methodist Girls' School (Primary) - Girls only, Affiliated",
        type: "primary",
      },
      { name: "Pei Chun Public School", type: "primary" },
      { name: "Pei Hwa Presbyterian Primary School", type: "primary" },
      { name: "Pei Tong Primary School", type: "primary" },
      { name: "Peiying Primary School", type: "primary" },
      { name: "Pioneer Primary School", type: "primary" },
      { name: "Poi Ching School", type: "primary" },
      { name: "Princess Elizabeth Primary School", type: "primary" },
      { name: "Punggol Cove Primary School", type: "primary" },
      { name: "Punggol Green Primary School", type: "primary" },
      { name: "Punggol Primary School", type: "primary" },
      { name: "Punggol View Primary School", type: "primary" },
      { name: "Qifa Primary School", type: "primary" },
      { name: "Qihua Primary School", type: "primary" },
      { name: "Queenstown Primary School", type: "primary" },
      { name: "Radin Mas Primary School", type: "primary" },
      { name: "Raffles Girls' Primary School - Girls only", type: "primary" },
      { name: "Red Swastika School", type: "primary" },
      { name: "River Valley Primary School", type: "primary" },
      { name: "Riverside Primary School", type: "primary" },
      { name: "Rivervale Primary School", type: "primary" },
      { name: "Rosyth School", type: "primary" },
      { name: "Rulang Primary School", type: "primary" },
      { name: "Sembawang Primary School", type: "primary" },
      { name: "Seng Kang Primary School", type: "primary" },
      { name: "Sengkang Green Primary School", type: "primary" },
      { name: "Shuqun Primary School", type: "primary" },
      { name: "Si Ling Primary School", type: "primary" },
      {
        name: "Singapore Chinese Girls' Primary School - Girls only, Affiliated",
        type: "primary",
      },
      { name: "South View Primary School", type: "primary" },
      { name: "Springdale Primary School", type: "primary" },
      {
        name: "St. Andrew's Junior School - Boys only, Affiliated",
        type: "primary",
      },
      {
        name: "St. Anthony's Canossian Primary School - Girls only, Affiliated",
        type: "primary",
      },
      { name: "St. Anthony's Primary School - Affiliated", type: "primary" },
      {
        name: "St. Gabriel's Primary School - Boys only, Affiliated",
        type: "primary",
      },
      { name: "St. Hilda's Primary School - Affiliated", type: "primary" },
      {
        name: "St. Joseph's Institution Junior - Boys only, Affiliated",
        type: "primary",
      },
      {
        name: "St. Margaret's School (Primary) - Girls only, Affiliated",
        type: "primary",
      },
      { name: "St. Stephen's School - Boys only, Affiliated", type: "primary" },
      { name: "Stamford Primary School", type: "primary" },
      { name: "Tampines North Primary School", type: "primary" },
      { name: "Tampines Primary School", type: "primary" },
      { name: "Tanjong Katong Primary School", type: "primary" },
      { name: "Tao Nan School", type: "primary" },
      { name: "Teck Ghee Primary School", type: "primary" },
      { name: "Teck Whye Primary School", type: "primary" },
      { name: "Telok Kurau Primary School", type: "primary" },
      { name: "Temasek Primary School", type: "primary" },
      { name: "Townsville Primary School", type: "primary" },
      { name: "Unity Primary School", type: "primary" },
      { name: "Valour Primary School", type: "primary" },
      { name: "Waterway Primary School", type: "primary" },
      { name: "Wellington Primary School", type: "primary" },
      { name: "West Grove Primary School", type: "primary" },
      { name: "West Spring Primary School", type: "primary" },
      { name: "West View Primary School", type: "primary" },
      { name: "Westwood Primary School", type: "primary" },
      { name: "White Sands Primary School", type: "primary" },
      { name: "Woodgrove Primary School", type: "primary" },
      { name: "Woodlands Primary School", type: "primary" },
      { name: "Woodlands Ring Primary School", type: "primary" },
      { name: "Xinghua Primary School", type: "primary" },
      { name: "Xingnan Primary School", type: "primary" },
      { name: "Xinmin Primary School", type: "primary" },
      { name: "Xishan Primary School", type: "primary" },
      { name: "Yangzheng Primary School", type: "primary" },
      { name: "Yew Tee Primary School", type: "primary" },
      { name: "Yio Chu Kang Primary School", type: "primary" },
      { name: "Yishun Primary School", type: "primary" },
      { name: "Yu Neng Primary School", type: "primary" },
      { name: "Yuhua Primary School", type: "primary" },
      { name: "Yumin Primary School", type: "primary" },
      { name: "Zhangde Primary School", type: "primary" },
      { name: "Zhenghua Primary School", type: "primary" },
      { name: "Zhonghua Primary School", type: "primary" },
    ],
    skipDuplicates: true, // avoid errors on rerun
  });
  // await prisma.course.createMany({
  //   data: [
  //     {
  //       schoolName: "National University of Singapore",
  //       courseName: "Introduction to Programming",
  //       courseCode: "CS1001",
  //     },
  //     {
  //       schoolName: "National University of Singapore",
  //       courseName: "Data Structures and Algorithms",
  //       courseCode: "CS1002",
  //     },
  //     {
  //       schoolName: "National University of Singapore",
  //       courseName: "Computer Systems",
  //       courseCode: "CS1003",
  //     },
  //     {
  //       schoolName: "National University of Singapore",
  //       courseName: "Operating Systems",
  //       courseCode: "CS1004",
  //     },
  //     {
  //       schoolName: "National University of Singapore",
  //       courseName: "Software Engineering",
  //       courseCode: "CS1005",
  //     },
  //     {
  //       schoolName: "National University of Singapore",
  //       courseName: "Databases",
  //       courseCode: "CS1006",
  //     },
  //     {
  //       schoolName: "National University of Singapore",
  //       courseName: "Computer Networks",
  //       courseCode: "CS1007",
  //     },
  //     {
  //       schoolName: "National University of Singapore",
  //       courseName: "Artificial Intelligence",
  //       courseCode: "CS1008",
  //     },
  //     {
  //       schoolName: "National University of Singapore",
  //       courseName: "Machine Learning",
  //       courseCode: "CS1009",
  //     },

  //     {
  //       schoolName: "Nanyang Technological University",
  //       courseName: "Programming Fundamentals",
  //       courseCode: "SC1001",
  //     },
  //     {
  //       schoolName: "Nanyang Technological University",
  //       courseName: "Discrete Mathematics",
  //       courseCode: "SC1002",
  //     },
  //     {
  //       schoolName: "Nanyang Technological University",
  //       courseName: "Object-Oriented Programming",
  //       courseCode: "SC1003",
  //     },
  //     {
  //       schoolName: "Nanyang Technological University",
  //       courseName: "Linear Algebra for Computing",
  //       courseCode: "SC1004",
  //     },
  //     {
  //       schoolName: "Nanyang Technological University",
  //       courseName: "Digital Logic",
  //       courseCode: "SC1005",
  //     },
  //     {
  //       schoolName: "Nanyang Technological University",
  //       courseName: "Computer Organisation & Architecture",
  //       courseCode: "SC1006",
  //     },
  //     {
  //       schoolName: "Nanyang Technological University",
  //       courseName: "Introduction to Cybersecurity",
  //       courseCode: "SC1007",
  //     },
  //     {
  //       schoolName: "Nanyang Technological University",
  //       courseName: "Cloud Computing Basics",
  //       courseCode: "SC1008",
  //     },
  //     {
  //       schoolName: "Nanyang Technological University",
  //       courseName: "Introduction to Web Development",
  //       courseCode: "SC1009",
  //     },

  //     {
  //       schoolName: "Singapore Management University",
  //       courseName: "Introduction to Business Analytics",
  //       courseCode: "COR1001",
  //     },
  //     {
  //       schoolName: "Singapore Management University",
  //       courseName: "Management Communication",
  //       courseCode: "COR1002",
  //     },
  //     {
  //       schoolName: "Singapore Management University",
  //       courseName: "Calculus for Business",
  //       courseCode: "COR1003",
  //     },
  //     {
  //       schoolName: "Singapore Management University",
  //       courseName: "Financial Accounting",
  //       courseCode: "COR1004",
  //     },
  //     {
  //       schoolName: "Singapore Management University",
  //       courseName: "Microeconomics",
  //       courseCode: "COR1005",
  //     },
  //     {
  //       schoolName: "Singapore Management University",
  //       courseName: "Programming with Python",
  //       courseCode: "COR1006",
  //     },
  //     {
  //       schoolName: "Singapore Management University",
  //       courseName: "Design Thinking",
  //       courseCode: "COR1007",
  //     },
  //     {
  //       schoolName: "Singapore Management University",
  //       courseName: "Ethics and Social Responsibility",
  //       courseCode: "COR1008",
  //     },
  //   ],
  //   skipDuplicates: true, // avoid errors on rerun
  // });

  // await prisma.user.createMany({
  //   data: [
  //     {
  //       id: 1001,
  //       email: "alice@example.com",
  //       username: "alice",
  //       passwordHash: "hashed_pw1",
  //       profilePicture:
  //         "https://api.dicebear.com/9.x/micah/svg?seed=552676&scale=100&radius=50&backgroundColor=ebebec&mouth=laughing,smile",
  //     },
  //     {
  //       id: 1002,
  //       email: "bob@example.com",
  //       username: "bob",
  //       passwordHash: "hashed_pw2",
  //       profilePicture:
  //         "https://api.dicebear.com/9.x/micah/svg?seed=918885&scale=100&radius=50&backgroundColor=ebebec&mouth=laughing,smile",
  //     },
  //     {
  //       id: 1003,
  //       email: "charlie@example.com",
  //       username: "charlie",
  //       passwordHash: "hashed_pw3",
  //       profilePicture:
  //         "https://api.dicebear.com/9.x/micah/svg?seed=315982&scale=100&radius=50&backgroundColor=ebebec&mouth=laughing,smile",
  //     },
  //   ],
  //   skipDuplicates: true,
  // });
}

main()
  .then(() => {
    console.log("Seed complete");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error("Seed error:", e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });
