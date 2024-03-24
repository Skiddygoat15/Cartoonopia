

function initializeSliderPair(fromSliderId, toSliderId, fromInputId, toInputId) {
  const fromSlider = document.querySelector(`#${fromSliderId}`);
  const toSlider = document.querySelector(`#${toSliderId}`);
  const fromInput = document.querySelector(`#${fromInputId}`);
  const toInput = document.querySelector(`#${toInputId}`);

  function controlFromSlider(fromSlider, toSlider, fromInput) {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, '#E5E5E5', '#3C3C3C');
    if (from >= to) {
      fromSlider.value = to - 0.1;
      fromInput.value = to - 0.1;
    } else {
      fromInput.value = from;
    }
  }

  function controlToSlider(fromSlider, toSlider, toInput) {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, '#E5E5E5', '#3C3C3C');
    setToggleAccessible(toSlider);
    if (to <= from) {
      toSlider.value = from + 0.1; //Keeps the thumbs from stacking over
      toInput.value = from + 0.1;
    } else {
      toInput.value = to;
    }
  }

  function getParsed(currentFrom, currentTo) {
    const from = parseInt(currentFrom.value, 10);
    const to = parseInt(currentTo.value, 10);
    return [from, to];
  }
  
  function fillSlider(from, to, sliderColor, rangeColor) {
    const percentageFrom = (from.value - from.min) / (from.max - from.min) * 100;
    const percentageTo = (to.value - to.min) / (to.max - to.min) * 85.5;
    
    const backgroundStyle = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${percentageFrom}%,
      ${rangeColor} ${percentageFrom}%,
      ${rangeColor} ${percentageTo}%,
      ${sliderColor} ${percentageTo}%,
      ${sliderColor} 100%
    )`;
  
    from.style.background = backgroundStyle;
    to.style.background = backgroundStyle;
  }
  
  function setToggleAccessible(currentTarget) {
    if (Number(currentTarget.value) <= 0 ) {
      toSlider.style.zIndex = 2;
    } else {
      toSlider.style.zIndex = 0;
    }
  }
  fillSlider(fromSlider, toSlider, '#E5E5E5', '#3C3C3C');
  setToggleAccessible(toSlider);

  fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
  toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);

  const fromLabelId = `${fromSliderId}Label`;
  const toLabelId = `${toSliderId}Label`;

  const updateSliderLabels = () => {
    const createOrUpdateLabel = (slider, value, id) => {
        let label = document.getElementById(id);
        if (!label) {
            label = document.createElement('div');
            label.id = id;
            label.className = 'slider-label';
            document.body.appendChild(label);
        }
        label.textContent = value;
        label.style.zIndex = '2';
        const sliderRect = slider.getBoundingClientRect();
        const thumbWidth = 22; 
        const thumbOffset = (slider.value / slider.max) * sliderRect.width;
        
        const percent = slider.value / slider.max;
        const adjustmentFactor = calculateAdjustmentFactor(percent, sliderRect.width);
        
        label.style.left = `${sliderRect.left + thumbOffset - (label.offsetWidth / 2) + (thumbWidth / 2) + adjustmentFactor}px`;
        const scrollOffset = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);// offsets the vertical drift
        label.style.top = `${sliderRect.top + scrollOffset - label.offsetHeight + 8}px`; 
    };
    
    function calculateAdjustmentFactor(percent, sliderWidth) {
        return -2 * percent * sliderWidth/13.5; // Important!!!!!Anti label drift, sliderWidth/'#', the smaller '#', the lower drift
    }
  
    createOrUpdateLabel(fromSlider, fromSlider.value, fromLabelId);
    createOrUpdateLabel(toSlider, toSlider.value, toLabelId);
  };
  fromSlider.addEventListener('input', updateSliderLabels);
toSlider.addEventListener('input', updateSliderLabels);
window.addEventListener('resize', updateSliderLabels);

updateSliderLabels();
}

initializeSliderPair('fromSlider', 'toSlider', 'fromInput', 'toInput');
initializeSliderPair('fromSliderSpeed', 'toSliderSpeed', 'fromInputSpeed', 'toInputSpeed');
initializeSliderPair('fromSliderSkill', 'toSliderSkill', 'fromInputSkill', 'toInputSkill');
initializeSliderPair('fromSliderFear', 'toSliderFear', 'fromInputFear', 'toInputFear');
initializeSliderPair('fromSliderPower', 'toSliderPower', 'fromInputPower', 'toInputPower');
initializeSliderPair('fromSliderIntelligence', 'toSliderIntelligence', 'fromInputIntelligence', 'toInputIntelligence');
initializeSliderPair('fromSliderWealth', 'toSliderWealth', 'fromInputWealth', 'toInputWealth');


function applyFilters() {
  const strengthFrom = document.getElementById('fromSlider').value;
  const strengthTo = document.getElementById('toSlider').value;
  const speedFrom = document.getElementById('fromSliderSpeed').value;
  const speedTo = document.getElementById('toSliderSpeed').value;
  const skillFrom = document.getElementById('fromSliderSkill').value;
  const skillTo = document.getElementById('toSliderSkill').value;
  const fearFFrom = document.getElementById('fromSliderFear').value;
  const fearFTo = document.getElementById('toSliderFear').value;
  const powerFrom = document.getElementById('fromSliderPower').value;
  const powerTo = document.getElementById('toSliderPower').value;
  const intelligenceFrom = document.getElementById('fromSliderIntelligence').value;
  const intelligenceTo = document.getElementById('toSliderIntelligence').value;
  const wealthFrom = document.getElementById('fromSliderWealth').value;
  const wealthTo = document.getElementById('toSliderWealth').value;

  const strengthRange = [parseInt(strengthFrom), parseInt(strengthTo)];
  const speedRange = [parseInt(speedFrom), parseInt(speedTo)];
  const skillRange = [parseInt(skillFrom), parseInt(skillTo)];
  const fearFRange = [parseInt(fearFFrom), parseInt(fearFTo)];
  const powerRange = [parseInt(powerFrom), parseInt(powerTo)];
  const intelligenceRange = [parseInt(intelligenceFrom), parseInt(intelligenceTo)];
  const wealthRange = [parseInt(wealthFrom), parseInt(wealthTo)];

  const searchValue = document.getElementById('search-input').value;
  search(searchValue, strengthRange, speedRange, skillRange, fearFRange, powerRange, intelligenceRange, wealthRange);
}

document.querySelectorAll('.sliders_control input[type="range"]').forEach(input => {
  input.addEventListener('input', applyFilters);
});

document.getElementById('search-input').addEventListener('input', applyFilters);

