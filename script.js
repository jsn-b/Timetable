document.addEventListener('DOMContentLoaded', function() {
    // --- SUBJECT DETAILS (NEW: for hover tooltips) ---
    const subjectDetails = {
        'CNS': 'Cryptography and Network Security',
        'ML': 'Machine Learning',
        'EE': 'Entrepreneurship Education',
        'ELCS LAB': 'English Language and Communication Skills Lab',
        'CDC': 'Career Development Course',
        'ELECTIVE-II': 'Program Elective II',
        'ELECTIVE-III': 'Program Elective III',
        'MINI PROJ': 'Mini Project',
        'Break': 'Break'
    };

    // --- CSE 3B TIMETABLE DATA (Sec-B only, Mon–Sat) ---
    // Period times (common to all days):
    // P1 09:00-09:50, P2 09:50-10:40, Break 10:40-10:50,
    // P3 10:50-11:40, P4 11:40-12:30, Break 12:30-13:30,
    // P5 13:30-14:20, P6 14:20-15:10, Break 15:10-15:20,
    // P7 15:20-16:10, P8 16:10-17:00.
    const timetableDataByDay = {
        // MONDAY – Sec-B row in sheet (left side, MONDAY)
        'Monday': [
            { time: '09:00 - 09:50', subject: '' },              // P1
            { time: '09:50 - 10:40', subject: 'CDC' },           // P2
            { time: '10:40 - 10:50', subject: 'Break' },         // Short Break
            { time: '10:50 - 11:40', subject: 'CNS' },           // P3
            { time: '11:40 - 12:30', subject: 'ELECTIVE-II' },   // P4
            { time: '12:30 - 13:30', subject: 'Break' },         // Lunch
            { time: '13:30 - 14:20', subject: '' },              // P5
            { time: '14:20 - 15:10', subject: '' },              // P6
            { time: '15:10 - 15:20', subject: 'Break' },         // Short Break
            { time: '15:20 - 16:10', subject: 'MINI PROJ' },     // P7
            { time: '16:10 - 17:00', subject: 'ELECTIVE-III' }   // P8
        ],

        // TUESDAY – Sec-B (left side, TUESDAY)
        'Tuesday': [
            { time: '09:00 - 09:50', subject: '' },              // P1
            { time: '09:50 - 10:40', subject: 'CNS' },           // P2
            { time: '10:40 - 10:50', subject: 'Break' },
            { time: '10:50 - 11:40', subject: 'ML' },            // P3
            { time: '11:40 - 12:30', subject: 'ML' },            // P4
            { time: '12:30 - 13:30', subject: 'Break' },
            { time: '13:30 - 14:20', subject: 'ELECTIVE-II' },   // P5
            { time: '14:20 - 15:10', subject: '' },              // P6
            { time: '15:10 - 15:20', subject: 'Break' },
            { time: '15:20 - 16:10', subject: '' },              // P7
            { time: '16:10 - 17:00', subject: '' }               // P8
        ],

        // WEDNESDAY – Sec-B (left side, WEDNESDAY)
        'Wednesday': [
            { time: '09:00 - 09:50', subject: '' },              // P1
            { time: '09:50 - 10:40', subject: 'CDC' },           // P2
            { time: '10:40 - 10:50', subject: 'Break' },
            { time: '10:50 - 11:40', subject: 'CNS' },           // P3
            { time: '11:40 - 12:30', subject: 'EE' },            // P4
            { time: '12:30 - 13:30', subject: 'Break' },
            { time: '13:30 - 14:20', subject: '' },              // P5
            { time: '14:20 - 15:10', subject: 'ML' },            // P6
            { time: '15:10 - 15:20', subject: 'Break' },
            { time: '15:20 - 16:10', subject: 'ML' },            // P7
            { time: '16:10 - 17:00', subject: 'ELECTIVE-III' }   // P8
        ],

        // THURSDAY – Sec-B (right side of MONDAY block, THURSDAY)
        'Thursday': [
            { time: '09:00 - 09:50', subject: 'ELECTIVE-II' },   // P1
            { time: '09:50 - 10:40', subject: 'ELCS LAB' },      // P2
            { time: '10:40 - 10:50', subject: 'Break' },
            { time: '10:50 - 11:40', subject: '' },              // P3
            { time: '11:40 - 12:30', subject: '' },              // P4
            { time: '12:30 - 13:30', subject: 'Break' },
            { time: '13:30 - 14:20', subject: '' },              // P5
            { time: '14:20 - 15:10', subject: 'EE' },            // P6
            { time: '15:10 - 15:20', subject: 'Break' },
            { time: '15:20 - 16:10', subject: '' },              // P7
            { time: '16:10 - 17:00', subject: 'ELECTIVE-III' }   // P8
        ],

        // FRIDAY – Sec-B (right side of TUESDAY block, FRIDAY)
        'Friday': [
            { time: '09:00 - 09:50', subject: '' },              // P1
            { time: '09:50 - 10:40', subject: 'CDC' },           // P2
            { time: '10:40 - 10:50', subject: 'Break' },
            { time: '10:50 - 11:40', subject: 'CNS' },           // P3
            { time: '11:40 - 12:30', subject: 'ELECTIVE-II' },   // P4
            { time: '12:30 - 13:30', subject: 'Break' },
            { time: '13:30 - 14:20', subject: '' },              // P5
            { time: '14:20 - 15:10', subject: 'EE' },            // P6
            { time: '15:10 - 15:20', subject: 'Break' },
            { time: '15:20 - 16:10', subject: 'MINI PROJ' },     // P7
            { time: '16:10 - 17:00', subject: '' }               // P8
        ],

        // SATURDAY – Sec-B (right side of WEDNESDAY block, SATURDAY)
        'Saturday': [
            { time: '09:00 - 09:50', subject: '' },              // P1
            { time: '09:50 - 10:40', subject: 'ELECTIVE-II' },   // P2
            { time: '10:40 - 10:50', subject: 'Break' },
            { time: '10:50 - 11:40', subject: 'ELECTIVE-III' },  // P3
            { time: '11:40 - 12:30', subject: '' },              // P4
            { time: '12:30 - 13:30', subject: 'Break' },
            { time: '13:30 - 14:20', subject: '' },              // P5
            { time: '14:20 - 15:10', subject: 'ELECTIVE-II' },   // P6
            { time: '15:10 - 15:20', subject: 'Break' },
            { time: '15:20 - 16:10', subject: 'MINI PROJ' },     // P7
            { time: '16:10 - 17:00', subject: '' }               // P8
        ]
    };

    const dailyTimetablesContainer = document.getElementById('daily-timetables-container');
    const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const now = new Date();
    const currentDayIndex = now.getDay(); // 0 = Sunday, 1 = Monday, ...
    const currentDayName = daysOrder[currentDayIndex - 1]; // existing logic preserved

    // Reorder days so current day is first (existing behavior)
    let orderedDays = [...daysOrder];
    if (currentDayName && daysOrder.includes(currentDayName)) {
        const index = orderedDays.indexOf(currentDayName);
        if (index > -1) {
            const day = orderedDays.splice(index, 1)[0];
            orderedDays.unshift(day);
        }
    }

    const createClassFromSubject = (subject) => {
        if (!subject || subject === "---") return '';
        return `subject-${subject.toLowerCase().replace(/\s+/g, '-').replace('&', 'and')}`;
    };

    // Generate a table for each day
    orderedDays.forEach(dayName => {
        const daySchedule = timetableDataByDay[dayName];
        if (!daySchedule) return;

        const dayCard = document.createElement('div');
        dayCard.classList.add('day-timetable-card');
        dayCard.setAttribute('data-day', dayName);

        if (dayName === currentDayName) {
            dayCard.classList.add('current-day-highlight');
        }

        const dayTitle = document.createElement('h2');
        dayTitle.textContent = dayName;
        dayCard.appendChild(dayTitle);

        const table = document.createElement('table');
        table.classList.add('timetable');
        
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        ['Time', 'Subject'].forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        daySchedule.forEach(slot => {
            const row = document.createElement('tr');

            const timeCell = document.createElement('td');
            timeCell.classList.add('time');
            timeCell.textContent = slot.time;
            row.appendChild(timeCell);

            const subjectCell = document.createElement('td');
            subjectCell.textContent = slot.subject;
            subjectCell.classList.add(createClassFromSubject(slot.subject));

            // NEW: add tooltip with full subject name if available
            if (subjectDetails[slot.subject]) {
                subjectCell.title = subjectDetails[slot.subject];
            }

            row.appendChild(subjectCell);
            tbody.appendChild(row);
        });
        table.appendChild(tbody);
        dayCard.appendChild(table);
        dailyTimetablesContainer.appendChild(dayCard);
    });

    // --- CURRENT PERIOD HIGHLIGHT (unchanged logic) ---
    function highlightCurrentPeriod() {
        const currentDayCard = document.querySelector('.current-day-highlight');
        if (!currentDayCard) return; // Exit if not a weekday (per existing behavior)

        const rows = currentDayCard.querySelectorAll('tbody tr');
        const now = new Date();

        // Helper to parse time strings like "09:00" into Date objects for today
        const parseTime = (timeStr) => {
            const [hours, minutes] = timeStr.split(':').map(Number);
            const date = new Date();
            date.setHours(hours, minutes, 0, 0);
            return date;
        };

        for (const row of rows) {
            const timeCell = row.querySelector('.time');
            if (timeCell) {
                const [startTimeStr, endTimeStr] = timeCell.textContent.split(' - ');
                const startTime = parseTime(startTimeStr);
                const endTime = parseTime(endTimeStr);

                if (now >= startTime && now < endTime) {
                    row.classList.add('current-period-highlight');
                    break; // Stop after finding the current period
                }
            }
        }
    }

    // Run the highlight function after building the tables
    highlightCurrentPeriod();
});
