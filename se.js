function createCalendar(containerId, year, month) {
    const container = document.getElementById(containerId);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Clear the container
    container.innerHTML = '';

    // Create month header
    const monthHeader = document.createElement('div');
    monthHeader.className = 'month';
    monthHeader.textContent = `${monthNames[month]} ${year}`;
    container.appendChild(monthHeader);

    // Create days grid
    const daysGrid = document.createElement('div');
    daysGrid.className = 'days';
    container.appendChild(daysGrid);

    // Add day labels
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (const label of dayLabels) {
      const dayLabel = document.createElement('div');
      dayLabel.className = 'day';
      dayLabel.textContent = label;
      daysGrid.appendChild(dayLabel);
    }

    // Add days
    for (let i = 1; i <= daysInMonth + firstDayOfMonth - 1; i++) {
      const day = document.createElement('div');
      day.className = 'day';
      if (i >= firstDayOfMonth) {
        day.textContent = i - firstDayOfMonth + 1;
      }
      daysGrid.appendChild(day);
    }
  }

  // Example: Create a calendar for October 2023
  createCalendar('calendarContainer', 2023, 9); // Note: Month is zero-based (0 for January, 1 for February, etc.)