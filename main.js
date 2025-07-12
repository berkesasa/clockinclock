const digitPatterns = {
    0: [
        [6, true], [0, true], [2, true],
        [6, true], [0, false], [2, true],
        [6, true], [0, false], [2, true],
        [6, true], [0, false], [2, true],
        [6, true], [0, true], [2, true]
    ],
    1: [
        [7, false], [1, false], [2, true],
        [7, false], [1, false], [2, true],
        [7, false], [1, false], [2, true],
        [7, false], [1, false], [2, true],
        [7, false], [1, false], [6, true]
    ],
    2: [
        [0, true], [0, true], [2, true],
        [7, false], [1, false], [2, true],
        [0, true], [0, true], [4, true],
        [6, true], [1, false], [3, false],
        [6, true], [0, true], [4, true]
    ],
    3: [
        [0, true], [0, true], [2, true],
        [7, false], [1, false], [2, true],
        [0, true], [0, true], [2, true],
        [7, false], [1, false], [2, true],
        [0, true], [0, true], [2, true]
    ],
    4: [
        [2, true], [1, false], [2, true],
        [6, true], [1, false], [2, true],
        [6, true], [0, true], [2, true],
        [7, false], [1, false], [2, true],
        [7, false], [1, false], [6, true]
    ],
    5: [
        [6, true], [0, true], [4, true],
        [6, true], [1, false], [3, false],
        [6, true], [0, true], [2, true],
        [7, false], [1, false], [2, true],
        [0, true], [0, true], [2, true]
    ],
    6: [
        [6, true], [0, true], [4, true],
        [6, true], [1, false], [3, false],
        [6, true], [0, true], [2, true],
        [6, true], [1, false], [2, true],
        [6, true], [0, true], [2, true]
    ],
    7: [
        [0, true], [0, true], [2, true],
        [7, false], [1, false], [2, true],
        [7, false], [1, false], [2, true],
        [7, false], [1, false], [2, true],
        [7, false], [1, false], [6, true]
    ],
    8: [
        [6, true], [0, true], [2, true],
        [6, true], [1, false], [2, true],
        [6, true], [0, true], [2, true],
        [6, true], [1, false], [2, true],
        [6, true], [0, true], [2, true]
    ],
    9: [
        [6, true], [0, true], [2, true],
        [6, true], [1, false], [2, true],
        [6, true], [0, true], [2, true],
        [7, false], [1, false], [2, true],
        [0, true], [0, true], [2, true]
    ]
};

function getRotationDegrees(direction) {
    const directions = {
        0: 0,
        1: 45,
        2: 90,
        3: 135,
        4: 180,
        5: 225,
        6: 270,
        7: 315
    };
    return directions[direction] || 0;
}

let currentDirection = 0;

function getNextDirection() {
    const direction = currentDirection;
    currentDirection = (currentDirection + 1) % 18;
    return direction;
}

function getRotationFromDirection(direction) {
    return direction * 20;
}

function getCellSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    if (width <= 480) {
        return { size: 16, gap: 1, spacing: 17 };
    } else if (width <= 768) {
        return { size: 20, gap: 2, spacing: 22 };
    } else if (window.orientation !== undefined && height <= 500) {
        return { size: 14, gap: 1, spacing: 15 };
    } else {
        return { size: 32, gap: 3, spacing: 35 };
    }
}

function createBackgroundGrid() {
    const container = $('#background-grid');
    const cellConfig = getCellSize();
    const cols = Math.floor(window.innerWidth / cellConfig.spacing);
    const rows = Math.floor(window.innerHeight / cellConfig.spacing);
    
    container.css({
        'grid-template-columns': `repeat(${cols}, ${cellConfig.size}px)`,
        'grid-template-rows': `repeat(${rows}, ${cellConfig.size}px)`
    });
    
    const centerCol = Math.floor(cols / 2);
    const centerRow = Math.floor(rows / 2);
    
    const timeWidth = 20;
    const timeHeight = 5;
    const timeStartCol = centerCol - Math.floor(timeWidth / 2);
    const timeStartRow = centerRow - Math.floor(timeHeight / 2);
    
    for (let i = 0; i < cols * rows; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;
        
        const isInTimeArea = (
            col >= timeStartCol && 
            col < timeStartCol + timeWidth &&
            row >= timeStartRow && 
            row < timeStartRow + timeHeight
        );
        
        if (isInTimeArea) {
            const timeCol = col - timeStartCol;
            const timeRow = row - timeStartRow;
            
            const cell = $('<div class="arrow-cell time-cell"></div>');
            const arrow = $('<div class="arrow-line"></div>');
            
            cell.attr('data-time-col', timeCol);
            cell.attr('data-time-row', timeRow);
            
            cell.append(arrow);
            container.append(cell);
        } else {
            const cell = $('<div class="arrow-cell"></div>');
            const arrow = $('<div class="arrow-line inactive"></div>');
            const nextDirection = getNextDirection();
            arrow.css('transform', `translateY(-50%) rotate(${getRotationFromDirection(nextDirection)}deg)`);
            cell.append(arrow);
            container.append(cell);
        }
    }
}

function getTimeCell(timeCol, timeRow) {
    return $(`.time-cell[data-time-col="${timeCol}"][data-time-row="${timeRow}"]`);
}

function isCornerCell(pattern, row, col) {
    const patternIndex = row * 3 + col;
    const [direction, isActive] = pattern[patternIndex];
    
    if (!isActive) return null;
    
    if (row === 0 && col === 0) {
        const rightActive = pattern[1] && pattern[1][1];
        const bottomActive = pattern[3] && pattern[3][1];
        if (rightActive && bottomActive) return 'top-left';
    }
    if (row === 0 && col === 2) {
        const leftActive = pattern[1] && pattern[1][1];
        const bottomActive = pattern[5] && pattern[5][1];
        if (leftActive && bottomActive) return 'top-right';
    }
    if (row === 4 && col === 0) {
        const rightActive = pattern[13] && pattern[13][1];
        const topActive = pattern[9] && pattern[9][1];
        if (rightActive && topActive) return 'bottom-left';
    }
    if (row === 4 && col === 2) {
        const leftActive = pattern[13] && pattern[13][1];
        const topActive = pattern[11] && pattern[11][1];
        if (leftActive && topActive) return 'bottom-right';
    }
    
    return null;
}

function updateDigit(digitIndex, digit, animate = false) {
    const pattern = digitPatterns[digit];
    
    const digitStartCols = [0, 3, 7, 10, 14, 17];
    const startCol = digitStartCols[digitIndex];
    
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 3; col++) {
            const patternIndex = row * 3 + col;
            const [direction, isActive] = pattern[patternIndex];
            const rotation = getRotationDegrees(direction);
            
            const cell = getTimeCell(startCol + col, row);
            const arrow = cell.find('.arrow-line');
            
            cell.removeClass('corner-cell top-left top-right bottom-left bottom-right');
            
            if (digitIndex >= 4) {
                cell.addClass('second-cell');
            } else {
                cell.removeClass('second-cell');
            }
            
            const cornerType = isCornerCell(pattern, row, col);
            if (cornerType) {
                cell.addClass('corner-cell ' + cornerType);
                if (isActive) {
                    cell.removeClass('inactive').addClass('active');
                } else {
                    cell.removeClass('active').addClass('inactive');
                }
            }
            
            if (animate && !cornerType) {
                const currentTransform = arrow.css('transform');
                let currentRotation = 0;
                if (currentTransform && currentTransform !== 'none') {
                    const values = currentTransform.split('(')[1].split(')')[0].split(',');
                    if (values.length >= 4) {
                        const a = parseFloat(values[0]);
                        const b = parseFloat(values[1]);
                        currentRotation = Math.round(Math.atan2(b, a) * (180/Math.PI));
                    }
                }
                
                let finalRotation = currentRotation + 360;
                
                const targetDiff = rotation - (finalRotation % 360);
                if (targetDiff !== 0) {
                    finalRotation += targetDiff;
                }
                
                arrow.addClass('shuffle-animation');
                arrow.css('--start-rotation', currentRotation + 'deg');
                arrow.css('--final-rotation', finalRotation + 'deg');
                setTimeout(() => {
                    arrow.css('transform', `translateY(-50%) rotate(${finalRotation}deg)`);
                    arrow.removeClass('shuffle-animation');
                    if (isActive) {
                        arrow.removeClass('inactive').addClass('active');
                    } else {
                        arrow.removeClass('active').addClass('inactive');
                    }
                }, 2000);
            } else if (!cornerType) {
                arrow.css('transform', `translateY(-50%) rotate(${rotation}deg)`);
                if (isActive) {
                    arrow.removeClass('inactive').addClass('active');
                } else {
                    arrow.removeClass('active').addClass('inactive');
                }
            }
        }
    }
}

function updateColon() {
    const colon1Cell1 = getTimeCell(6, 1);
    const colon1Cell2 = getTimeCell(6, 3);
    
    colon1Cell1.addClass('colon-cell').html('<div class="colon-dot"></div>');
    colon1Cell2.addClass('colon-cell').html('<div class="colon-dot"></div>');
    
    const colon2Cell1 = getTimeCell(13, 1);
    const colon2Cell2 = getTimeCell(13, 3);
    
    colon2Cell1.addClass('colon-cell').html('<div class="colon-dot"></div>');
    colon2Cell2.addClass('colon-cell').html('<div class="colon-dot"></div>');
    
    const emptyCell1_1 = getTimeCell(6, 0);
    const emptyCell1_2 = getTimeCell(6, 2);
    const emptyCell1_3 = getTimeCell(6, 4);
    
    emptyCell1_1.addClass('empty-cell');
    emptyCell1_2.addClass('empty-cell');
    emptyCell1_3.addClass('empty-cell');
    
    const emptyCell2_1 = getTimeCell(13, 0);
    const emptyCell2_2 = getTimeCell(13, 2);
    const emptyCell2_3 = getTimeCell(13, 4);
    
    emptyCell2_1.addClass('empty-cell');
    emptyCell2_2.addClass('empty-cell');
    emptyCell2_3.addClass('empty-cell');
}

function animateBackgroundGrid() {
    $('#background-grid .arrow-line').each(function() {
        const arrow = $(this);
        
        const currentTransform = arrow.css('transform');
        let currentRotation = 0;
        if (currentTransform && currentTransform !== 'none') {
            const values = currentTransform.split('(')[1].split(')')[0].split(',');
            if (values.length >= 4) {
                const a = parseFloat(values[0]);
                const b = parseFloat(values[1]);
                currentRotation = Math.round(Math.atan2(b, a) * (180/Math.PI));
            }
        }
        
        const finalRotation = currentRotation + 360;
        
        arrow.addClass('shuffle-animation');
        arrow.css('--start-rotation', currentRotation + 'deg');
        arrow.css('--final-rotation', finalRotation + 'deg');
        setTimeout(() => {
            arrow.css('transform', `translateY(-50%) rotate(${finalRotation}deg)`);
            arrow.removeClass('shuffle-animation');
        }, 2000);
    });
}

function initializeDisplay() {
    currentDirection = 0;
    createBackgroundGrid();
    updateColon();
}

let previousTime = '';
let testMode = false;
let currentTestTime = null;

function testTime(timeString) {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
    if (!timeRegex.test(timeString)) {
        console.error('Invalid time format! Please use HH:MM:SS format (e.g., "14:30:25")');
        return;
    }
    
    const [hours, minutes, seconds] = timeString.split(':');
    const paddedHours = hours.padStart(2, '0');
    const paddedMinutes = minutes.padStart(2, '0');
    const paddedSeconds = seconds.padStart(2, '0');
    
    testMode = true;
    currentTestTime = `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
    console.log(`Test mode activated. Time set to: ${paddedHours}:${paddedMinutes}:${paddedSeconds}`);
    console.log('Use exitTestMode() to return to real time');
    console.log('Use nextSecond() to advance to next second with animation');
    console.log('Use nextMinute() to advance to next minute with animation');
    
    updateDigit(0, parseInt(paddedHours[0]), false);
    updateDigit(1, parseInt(paddedHours[1]), false);
    updateDigit(2, parseInt(paddedMinutes[0]), false);
    updateDigit(3, parseInt(paddedMinutes[1]), false);
    updateDigit(4, parseInt(paddedSeconds[0]), false);
    updateDigit(5, parseInt(paddedSeconds[1]), false);
}

function nextSecond() {
    if (!testMode || !currentTestTime) {
        console.error('Not in test mode! Use testTime("HH:MM:SS") first.');
        return;
    }
    
    const [hours, minutes, seconds] = currentTestTime.split(':');
    let newHours = parseInt(hours);
    let newMinutes = parseInt(minutes);
    let newSeconds = parseInt(seconds) + 1;
    
    let willCrossMinute = false;
    let willCrossHour = false;
    
    if (newSeconds >= 60) {
        newSeconds = 0;
        newMinutes += 1;
        willCrossMinute = true;
        
        if (newMinutes >= 60) {
            newMinutes = 0;
            newHours += 1;
            willCrossHour = true;
            
            if (newHours >= 24) {
                newHours = 0;
            }
        }
    }
    
    const paddedHours = newHours.toString().padStart(2, '0');
    const paddedMinutes = newMinutes.toString().padStart(2, '0');
    const paddedSeconds = newSeconds.toString().padStart(2, '0');
    currentTestTime = `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
    
    console.log(`Advancing to: ${paddedHours}:${paddedMinutes}:${paddedSeconds}`);
    
    if (willCrossMinute || willCrossHour) {
        animateBackgroundGrid();
    }
    
    updateDigit(0, parseInt(paddedHours[0]), willCrossHour);
    updateDigit(1, parseInt(paddedHours[1]), willCrossHour);
    updateDigit(2, parseInt(paddedMinutes[0]), willCrossMinute);
    updateDigit(3, parseInt(paddedMinutes[1]), willCrossMinute);
    updateDigit(4, parseInt(paddedSeconds[0]), false);
    updateDigit(5, parseInt(paddedSeconds[1]), false);
}

function nextMinute() {
    if (!testMode || !currentTestTime) {
        console.error('Not in test mode! Use testTime("HH:MM:SS") first.');
        return;
    }
    
    const [hours, minutes, seconds] = currentTestTime.split(':');
    let newHours = parseInt(hours);
    let newMinutes = parseInt(minutes) + 1;
    let newSeconds = 0;
    
    if (newMinutes >= 60) {
        newMinutes = 0;
        newHours += 1;
        
        if (newHours >= 24) {
            newHours = 0;
        }
    }
    
    const paddedHours = newHours.toString().padStart(2, '0');
    const paddedMinutes = newMinutes.toString().padStart(2, '0');
    const paddedSeconds = newSeconds.toString().padStart(2, '0');
    currentTestTime = `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
    
    console.log(`Advancing to: ${paddedHours}:${paddedMinutes}:${paddedSeconds}`);
    
    animateBackgroundGrid();
    
    updateDigit(0, parseInt(paddedHours[0]), true);
    updateDigit(1, parseInt(paddedHours[1]), true);
    updateDigit(2, parseInt(paddedMinutes[0]), true);
    updateDigit(3, parseInt(paddedMinutes[1]), true);
    updateDigit(4, parseInt(paddedSeconds[0]), true);
    updateDigit(5, parseInt(paddedSeconds[1]), true);
}

function exitTestMode() {
    testMode = false;
    currentTestTime = null;
    console.log('Test mode deactivated. Returning to real time.');
    updateTime();
}

window.testTime = testTime;
window.nextSecond = nextSecond;
window.nextMinute = nextMinute;
window.exitTestMode = exitTestMode;

function updateTime() {
    if (testMode) {
        return;
    }
    
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}:${seconds}`;
    
    if (previousTime !== '') {
        const [prevHours, prevMinutes, prevSeconds] = previousTime.split(':');
        
        const hourChanged = hours !== prevHours;
        const minuteChanged = minutes !== prevMinutes;
        const secondChanged = seconds !== prevSeconds;
        
        const shouldFullAnimate = hourChanged || minuteChanged;
        
        if (shouldFullAnimate) {
            animateBackgroundGrid();
        }
        
        updateDigit(0, parseInt(hours[0]), hourChanged);
        updateDigit(1, parseInt(hours[1]), hourChanged);
        updateDigit(2, parseInt(minutes[0]), minuteChanged);
        updateDigit(3, parseInt(minutes[1]), minuteChanged);
        updateDigit(4, parseInt(seconds[0]), false);
        updateDigit(5, parseInt(seconds[1]), false);
    } else {
        updateDigit(0, parseInt(hours[0]), false);
        updateDigit(1, parseInt(hours[1]), false);
        updateDigit(2, parseInt(minutes[0]), false);
        updateDigit(3, parseInt(minutes[1]), false);
        updateDigit(4, parseInt(seconds[0]), false);
        updateDigit(5, parseInt(seconds[1]), false);
    }
    
    previousTime = currentTime;
}

function handleResize() {
    currentDirection = 0;
    createBackgroundGrid();
    updateColon();
}

function handleOrientationChange() {
    setTimeout(() => {
        handleResize();
    }, 100);
}

$(document).ready(function() {
    initializeDisplay();
    updateTime();
    
    setInterval(updateTime, 1000);
    
    $(window).on('resize', handleResize);
    $(window).on('orientationchange', handleOrientationChange);
    
    $(document).on('touchstart', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    });
    
    $(document).on('contextmenu', function(e) {
        e.preventDefault();
    });
}); 