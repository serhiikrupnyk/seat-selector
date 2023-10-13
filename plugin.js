$(document).ready(function() {
    const modal = $('#modal');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const circles = [];
    let currentColor = 'blue';
    let isEraser = false;
    const circleSize = 40;
    const gridSize = 20;

    const erase = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        circles.length = 0;
    };

    const drawGrid = () => {
        ctx.fillStyle = '#ccc';

        for (let x = 0; x < canvas.width; x += gridSize) {
            for (let y = 0; y < canvas.height; y += gridSize) {
                ctx.fillRect(x, y, gridSize, gridSize);
            }
        }
    };


    const drawCircles = (circles) => {
        for (const circle of circles) {
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
            ctx.fillStyle = circle.color;
            ctx.fill();
            ctx.closePath();
        }
    };

    canvas.width = '500';
    canvas.height = '500';

    $('#openModal').click(function() {
        modal.show();
        $('body').css('background', 'rgba(0, 0, 0, 0.5)');
        erase();

        canvas.onclick = function(e) {
const x = e.clientX - canvas.getBoundingClientRect().left;
const y = e.clientY - canvas.getBoundingClientRect().top;

if (isEraser) {
let removed = false;

for (let i = circles.length - 1; i >= 0; i--) {
    const circle = circles[i];
    const dx = x - circle.x;
    const dy = y - circle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= circle.radius && !removed) {
        circles.splice(i, 1);
        removed = true;
    }
}
erase();
drawCircles(circles);
} else {
let canDraw = true;

for (const circle of circles) {
    const dx = x - circle.x;
    const dy = y - circle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= circle.radius) {
        canDraw = false;
        break;
    }
}

if (canDraw) {
    const gridX = Math.floor(x / gridSize) * gridSize;
    const gridY = Math.floor(y / gridSize) * gridSize;

    ctx.beginPath();
    ctx.arc(gridX + gridSize / 2, gridY + gridSize / 2, gridSize / 2, 0, 2 * Math.PI);
    ctx.fillStyle = currentColor;
    ctx.fill();
    ctx.closePath();

    circles.push({ x: gridX + gridSize / 2, y: gridY + gridSize / 2, radius: gridSize / 2, color: currentColor });
}
}
};
    });

    $('.close-modal').click(function() {
        modal.hide();
        $('body').css('background', 'none');
        console.log(circles);
    });

    $('#eraser').click(function() {
        isEraser = true;
        currentColor = 'white';
    });

    $('#redBrush').click(function() {
        isEraser = false;
        currentColor = 'red';
    });

    $('#blueBrush').click(function() {
        isEraser = false;
        currentColor = 'blue';
    });

    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.hide();
            $('body').css('background', 'none');
            console.log(circles);
        }
    });

    $(window).on('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        erase();
        drawGrid();
        drawCircles(circles);
    });
});