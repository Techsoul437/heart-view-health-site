// mockData.js - All dashboard data organized by year and month

export const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const years = [2023, 2024, 2025];

// Generate weekly overview data for each month/year
const generateWeeklyData = (baseUploaded: number, baseViewed: number, baseDownloaded: number) => [
  { day: "Week 1", uploaded: baseUploaded - 40, viewed: baseViewed - 80, downloaded: baseDownloaded - 30 },
  { day: "Week 2", uploaded: baseUploaded - 10, viewed: baseViewed - 20, downloaded: baseDownloaded - 10 },
  { day: "Week 3", uploaded: baseUploaded + 20, viewed: baseViewed + 40, downloaded: baseDownloaded + 15 },
  { day: "Week 4", uploaded: baseUploaded + 50, viewed: baseViewed + 100, downloaded: baseDownloaded + 40 },
];

// Monthly stats per year
export const dashboardData = {
  2023: {
    January:   { uploaded: 95,  pending: 28, viewed: 310, downloaded: 140, weeklyData: generateWeeklyData(95,310,140),  statusData: { completed: 1800, pending: 560, processing: 210, failed: 70  }, totalReports: 2640 },
    February:  { uploaded: 88,  pending: 22, viewed: 295, downloaded: 128, weeklyData: generateWeeklyData(88,295,128),  statusData: { completed: 1750, pending: 500, processing: 195, failed: 55  }, totalReports: 2500 },
    March:     { uploaded: 102, pending: 31, viewed: 340, downloaded: 158, weeklyData: generateWeeklyData(102,340,158), statusData: { completed: 1920, pending: 620, processing: 240, failed: 80  }, totalReports: 2860 },
    April:     { uploaded: 110, pending: 35, viewed: 370, downloaded: 172, weeklyData: generateWeeklyData(110,370,172), statusData: { completed: 2050, pending: 680, processing: 260, failed: 90  }, totalReports: 3080 },
    May:       { uploaded: 118, pending: 33, viewed: 395, downloaded: 180, weeklyData: generateWeeklyData(118,395,180), statusData: { completed: 2200, pending: 710, processing: 280, failed: 95  }, totalReports: 3285 },
    June:      { uploaded: 125, pending: 38, viewed: 420, downloaded: 192, weeklyData: generateWeeklyData(125,420,192), statusData: { completed: 2350, pending: 750, processing: 295, failed: 100 }, totalReports: 3495 },
    July:      { uploaded: 132, pending: 40, viewed: 445, downloaded: 200, weeklyData: generateWeeklyData(132,445,200), statusData: { completed: 2480, pending: 790, processing: 310, failed: 105 }, totalReports: 3685 },
    August:    { uploaded: 140, pending: 42, viewed: 460, downloaded: 210, weeklyData: generateWeeklyData(140,460,210), statusData: { completed: 2600, pending: 820, processing: 315, failed: 110 }, totalReports: 3845 },
    September: { uploaded: 135, pending: 39, viewed: 450, downloaded: 205, weeklyData: generateWeeklyData(135,450,205), statusData: { completed: 2520, pending: 800, processing: 312, failed: 108 }, totalReports: 3740 },
    October:   { uploaded: 128, pending: 36, viewed: 435, downloaded: 198, weeklyData: generateWeeklyData(128,435,198), statusData: { completed: 2460, pending: 775, processing: 308, failed: 107 }, totalReports: 3650 },
    November:  { uploaded: 120, pending: 34, viewed: 415, downloaded: 188, weeklyData: generateWeeklyData(120,415,188), statusData: { completed: 2380, pending: 755, processing: 300, failed: 105 }, totalReports: 3540 },
    December:  { uploaded: 115, pending: 30, viewed: 400, downloaded: 182, weeklyData: generateWeeklyData(115,400,182), statusData: { completed: 2300, pending: 730, processing: 290, failed: 100 }, totalReports: 3420 },
  },
  2024: {
    January:   { uploaded: 108, pending: 30, viewed: 350, downloaded: 155, weeklyData: generateWeeklyData(108,350,155), statusData: { completed: 2000, pending: 610, processing: 230, failed: 80  }, totalReports: 2920 },
    February:  { uploaded: 100, pending: 25, viewed: 330, downloaded: 142, weeklyData: generateWeeklyData(100,330,142), statusData: { completed: 1900, pending: 570, processing: 215, failed: 65  }, totalReports: 2750 },
    March:     { uploaded: 115, pending: 34, viewed: 375, downloaded: 168, weeklyData: generateWeeklyData(115,375,168), statusData: { completed: 2100, pending: 660, processing: 255, failed: 85  }, totalReports: 3100 },
    April:     { uploaded: 122, pending: 38, viewed: 400, downloaded: 182, weeklyData: generateWeeklyData(122,400,182), statusData: { completed: 2250, pending: 720, processing: 275, failed: 95  }, totalReports: 3340 },
    May:       { uploaded: 130, pending: 36, viewed: 430, downloaded: 192, weeklyData: generateWeeklyData(130,430,192), statusData: { completed: 2400, pending: 760, processing: 295, failed: 100 }, totalReports: 3555 },
    June:      { uploaded: 138, pending: 40, viewed: 455, downloaded: 204, weeklyData: generateWeeklyData(138,455,204), statusData: { completed: 2520, pending: 800, processing: 310, failed: 110 }, totalReports: 3740 },
    July:      { uploaded: 145, pending: 43, viewed: 475, downloaded: 214, weeklyData: generateWeeklyData(145,475,214), statusData: { completed: 2650, pending: 840, processing: 325, failed: 115 }, totalReports: 3930 },
    August:    { uploaded: 152, pending: 45, viewed: 492, downloaded: 222, weeklyData: generateWeeklyData(152,492,222), statusData: { completed: 2780, pending: 870, processing: 330, failed: 120 }, totalReports: 4100 },
    September: { uploaded: 148, pending: 42, viewed: 482, downloaded: 218, weeklyData: generateWeeklyData(148,482,218), statusData: { completed: 2700, pending: 850, processing: 325, failed: 118 }, totalReports: 3993 },
    October:   { uploaded: 140, pending: 39, viewed: 465, downloaded: 210, weeklyData: generateWeeklyData(140,465,210), statusData: { completed: 2620, pending: 825, processing: 318, failed: 115 }, totalReports: 3878 },
    November:  { uploaded: 132, pending: 37, viewed: 445, downloaded: 200, weeklyData: generateWeeklyData(132,445,200), statusData: { completed: 2530, pending: 800, processing: 312, failed: 110 }, totalReports: 3752 },
    December:  { uploaded: 125, pending: 32, viewed: 428, downloaded: 194, weeklyData: generateWeeklyData(125,428,194), statusData: { completed: 2440, pending: 775, processing: 305, failed: 105 }, totalReports: 3625 },
  },
  2025: {
    January:   { uploaded: 118, pending: 32, viewed: 380, downloaded: 165, weeklyData: generateWeeklyData(118,380,165), statusData: { completed: 2150, pending: 640, processing: 245, failed: 82  }, totalReports: 3117 },
    February:  { uploaded: 110, pending: 28, viewed: 360, downloaded: 150, weeklyData: generateWeeklyData(110,360,150), statusData: { completed: 2050, pending: 600, processing: 228, failed: 72  }, totalReports: 2950 },
    March:     { uploaded: 122, pending: 36, viewed: 398, downloaded: 175, weeklyData: generateWeeklyData(122,398,175), statusData: { completed: 2280, pending: 700, processing: 268, failed: 92  }, totalReports: 3340 },
    April:     { uploaded: 128, pending: 36, viewed: 412, downloaded: 187, weeklyData: generateWeeklyData(128,412,187), statusData: { completed: 2540, pending: 780, processing: 320, failed: 100 }, totalReports: 3740 },
    May:       { uploaded: 128, pending: 36, viewed: 412, downloaded: 187, weeklyData: generateWeeklyData(128,412,187), statusData: { completed: 2540, pending: 780, processing: 320, failed: 100 }, totalReports: 3740 },
    June:      { uploaded: 142, pending: 41, viewed: 438, downloaded: 198, weeklyData: generateWeeklyData(142,438,198), statusData: { completed: 2680, pending: 820, processing: 315, failed: 108 }, totalReports: 3923 },
    July:      { uploaded: 148, pending: 44, viewed: 458, downloaded: 208, weeklyData: generateWeeklyData(148,458,208), statusData: { completed: 2800, pending: 860, processing: 330, failed: 112 }, totalReports: 4102 },
    August:    { uploaded: 155, pending: 46, viewed: 478, downloaded: 218, weeklyData: generateWeeklyData(155,478,218), statusData: { completed: 2920, pending: 895, processing: 345, failed: 118 }, totalReports: 4278 },
    September: { uploaded: 150, pending: 43, viewed: 465, downloaded: 212, weeklyData: generateWeeklyData(150,465,212), statusData: { completed: 2840, pending: 875, processing: 338, failed: 116 }, totalReports: 4169 },
    October:   { uploaded: 142, pending: 40, viewed: 448, downloaded: 204, weeklyData: generateWeeklyData(142,448,204), statusData: { completed: 2760, pending: 850, processing: 330, failed: 113 }, totalReports: 4053 },
    November:  { uploaded: 135, pending: 38, viewed: 430, downloaded: 196, weeklyData: generateWeeklyData(135,430,196), statusData: { completed: 2670, pending: 825, processing: 322, failed: 110 }, totalReports: 3927 },
    December:  { uploaded: 128, pending: 34, viewed: 415, downloaded: 188, weeklyData: generateWeeklyData(128,415,188), statusData: { completed: 2580, pending: 800, processing: 315, failed: 107 }, totalReports: 3802 },
  }
};

// Recent Uploads data (static sample)
export const recentUploads = [
  { id: 1, name: "CT Chest Report.pdf",    patient: "John Doe",      uploadedBy: "Dr. Admin", time: "10:20 AM", type: "ct"  },
  { id: 2, name: "MRI Brain Report.pdf",   patient: "Sarah Smith",   uploadedBy: "Dr. Admin", time: "09:45 AM", type: "mri" },
  { id: 3, name: "X-Ray Hand Report.pdf",  patient: "Michael Brown", uploadedBy: "Dr. Admin", time: "09:10 AM", type: "xray"},
  { id: 4, name: "USG Abdomen Report.pdf", patient: "Emily Davis",   uploadedBy: "Dr. Admin", time: "08:35 AM", type: "usg" },
  { id: 5, name: "Blood Test Report.pdf",  patient: "David Wilson",  uploadedBy: "Dr. Admin", time: "08:05 AM", type: "blood"},
  { id: 6, name: "ECG Report.pdf",         patient: "Anna Lee",      uploadedBy: "Dr. Admin", time: "07:50 AM", type: "ecg" },
  { id: 7, name: "MRI Knee Report.pdf",    patient: "Robert King",   uploadedBy: "Dr. Admin", time: "07:30 AM", type: "mri" },
];

export const pendingReports = [
  { id: 1, name: "CT Angiography.pdf",    patient: "Robert Johnson", uploadedBy: "Dr. Admin", pendingSince: "2h 15m" },
  { id: 2, name: "MRI Spine Report.pdf",  patient: "Lisa Taylor",    uploadedBy: "Dr. Admin", pendingSince: "1h 40m" },
  { id: 3, name: "PET Scan Report.pdf",   patient: "James Anderson", uploadedBy: "Dr. Admin", pendingSince: "1h 10m" },
  { id: 4, name: "X-Ray Chest Report.pdf",patient: "Jessica White",  uploadedBy: "Dr. Admin", pendingSince: "50m"    },
  { id: 5, name: "Echo Report.pdf",       patient: "Daniel Thomas",  uploadedBy: "Dr. Admin", pendingSince: "30m"    },
  { id: 6, name: "CT Brain Report.pdf",   patient: "Nancy Clark",    uploadedBy: "Dr. Admin", pendingSince: "20m"    },
];

// All Reports page data
export const allReports = [
  { id: "RPT001", name: "CT Chest Report.pdf",     patient: "John Doe",       doctor: "Dr. Smith",   date: "2025-05-20", status: "Completed", type: "CT Scan"    },
  { id: "RPT002", name: "MRI Brain Report.pdf",    patient: "Sarah Smith",    doctor: "Dr. Patel",   date: "2025-05-20", status: "Pending",   type: "MRI"        },
  { id: "RPT003", name: "X-Ray Hand Report.pdf",   patient: "Michael Brown",  doctor: "Dr. Kumar",   date: "2025-05-19", status: "Completed", type: "X-Ray"      },
  { id: "RPT004", name: "USG Abdomen Report.pdf",  patient: "Emily Davis",    doctor: "Dr. Admin",   date: "2025-05-19", status: "Processing",type: "Ultrasound" },
  { id: "RPT005", name: "Blood Test Report.pdf",   patient: "David Wilson",   doctor: "Dr. Sharma",  date: "2025-05-18", status: "Completed", type: "Blood Test" },
  { id: "RPT006", name: "ECG Report.pdf",          patient: "Anna Lee",       doctor: "Dr. Mehta",   date: "2025-05-18", status: "Failed",    type: "ECG"        },
  { id: "RPT007", name: "MRI Knee Report.pdf",     patient: "Robert King",    doctor: "Dr. Admin",   date: "2025-05-17", status: "Completed", type: "MRI"        },
  { id: "RPT008", name: "PET Scan Report.pdf",     patient: "James Anderson", doctor: "Dr. Gupta",   date: "2025-05-17", status: "Pending",   type: "PET Scan"   },
  { id: "RPT009", name: "CT Angiography.pdf",      patient: "Robert Johnson", doctor: "Dr. Patel",   date: "2025-05-16", status: "Processing",type: "CT Scan"    },
  { id: "RPT010", name: "Echo Report.pdf",         patient: "Daniel Thomas",  doctor: "Dr. Smith",   date: "2025-05-16", status: "Completed", type: "Echo"       },
  { id: "RPT011", name: "Chest X-Ray Report.pdf",  patient: "Nancy Clark",    doctor: "Dr. Kumar",   date: "2025-05-15", status: "Completed", type: "X-Ray"      },
  { id: "RPT012", name: "MRI Spine Report.pdf",    patient: "Lisa Taylor",    doctor: "Dr. Admin",   date: "2025-05-15", status: "Pending",   type: "MRI"        },
];

// Patients page data
export const patients = [
  { id: "PT001", name: "John Doe",       age: 45, gender: "Male",   contact: "+91-9876543210", reports: 8,  lastVisit: "2025-05-20", doctor: "Dr. Smith"  },
  { id: "PT002", name: "Sarah Smith",    age: 32, gender: "Female", contact: "+91-9876543211", reports: 5,  lastVisit: "2025-05-19", doctor: "Dr. Patel"  },
  { id: "PT003", name: "Michael Brown",  age: 58, gender: "Male",   contact: "+91-9876543212", reports: 12, lastVisit: "2025-05-19", doctor: "Dr. Kumar"  },
  { id: "PT004", name: "Emily Davis",    age: 27, gender: "Female", contact: "+91-9876543213", reports: 3,  lastVisit: "2025-05-18", doctor: "Dr. Admin"  },
  { id: "PT005", name: "David Wilson",   age: 63, gender: "Male",   contact: "+91-9876543214", reports: 15, lastVisit: "2025-05-18", doctor: "Dr. Sharma" },
  { id: "PT006", name: "Anna Lee",       age: 39, gender: "Female", contact: "+91-9876543215", reports: 7,  lastVisit: "2025-05-17", doctor: "Dr. Mehta"  },
  { id: "PT007", name: "Robert King",    age: 51, gender: "Male",   contact: "+91-9876543216", reports: 9,  lastVisit: "2025-05-17", doctor: "Dr. Admin"  },
  { id: "PT008", name: "Jessica White",  age: 44, gender: "Female", contact: "+91-9876543217", reports: 6,  lastVisit: "2025-05-16", doctor: "Dr. Gupta"  },
  { id: "PT009", name: "Daniel Thomas",  age: 35, gender: "Male",   contact: "+91-9876543218", reports: 4,  lastVisit: "2025-05-16", doctor: "Dr. Smith"  },
  { id: "PT010", name: "Lisa Taylor",    age: 29, gender: "Female", contact: "+91-9876543219", reports: 11, lastVisit: "2025-05-15", doctor: "Dr. Admin"  },
];

// Doctors page data
export const doctors = [
  { id: "DR001", name: "Dr. Rajesh Smith",  specialty: "Radiologist",       patients: 124, reports: 342, rating: 4.8, status: "Active",   joinDate: "2020-03-15" },
  { id: "DR002", name: "Dr. Priya Patel",   specialty: "Cardiologist",      patients: 98,  reports: 278, rating: 4.9, status: "Active",   joinDate: "2019-07-22" },
  { id: "DR003", name: "Dr. Amit Kumar",    specialty: "Orthopedic",        patients: 87,  reports: 215, rating: 4.7, status: "Active",   joinDate: "2021-01-10" },
  { id: "DR004", name: "Dr. Admin",         specialty: "General Medicine",  patients: 210, reports: 580, rating: 4.6, status: "Active",   joinDate: "2018-05-01" },
  { id: "DR005", name: "Dr. Nisha Sharma",  specialty: "Neurologist",       patients: 76,  reports: 198, rating: 4.9, status: "Active",   joinDate: "2022-02-14" },
  { id: "DR006", name: "Dr. Vikram Mehta",  specialty: "Cardiologist",      patients: 93,  reports: 260, rating: 4.7, status: "Active",   joinDate: "2020-09-30" },
  { id: "DR007", name: "Dr. Sunita Gupta",  specialty: "Gynecologist",      patients: 115, reports: 310, rating: 4.8, status: "On Leave", joinDate: "2019-11-05" },
];