/**
 * Update the required form validation error messages
 * & return them.
 *
 * @return {Array} fields
 * @return {DOMEl} fields.input
 * @return {DOMEl} fields.message
 */
function requiredFields() {
  const fields = [];

  function isNotValidDisplayMessage(message) {
    return message.style.display !== "none";
  }

  function isNotValidStartDate(message) {
    let currentMessage = message.innerHTML;
    if (typeof currentMessage !== "string") return false;
    currentMessage = currentMessage.trim().toLowerCase();
    if (currentMessage === "invalid start date") return true;
    if (currentMessage === "enter a start date above") return true;
    return false;
  }

  const name = {
    input: document.getElementById("event_name"),
    message: document.getElementById("x-need-name"),
    isNotValid: isNotValidDisplayMessage
  };

  const description = {
    input: document.getElementById("event_description")
      ? document.getElementById("event_description").parentNode
      : null,
    message: document.getElementById("x-need-description"),
    isNotValid: isNotValidDisplayMessage
  };

  const gradstudy = {
    input: document.getElementById(
      "custom_fields_add_to_calendar_at_graduatestudyrisdedu"
    ),
    message: document.getElementById(
      "x-need-custom_fields_add_to_calendar_at_graduatestudyrisdedu"
    ),
    isNotValid: isNotValidDisplayMessage
  };

  const startDate = {
    input: document.getElementById("start_date"),
    message: document.querySelector(".schedule-summary"),
    isNotValid: isNotValidStartDate
  };

  if (name.input && name.message) {
    name.message.innerHTML =
      "Please enter an event name (ex: Visiting artist | Pablo Picasso)";
    fields.push(name);
  }

  if (description.input && description.message) {
    description.message.innerHTML =
      "Please enter an event description approximately 100 words in length";
    fields.push(description);
  }

  if (startDate.input && startDate.message) {
    fields.push(startDate);
  }

  if (gradstudy.input && gradstudy.message) {
    gradstudy.message.innerHTML = 'Please enter "yes" or "no" in this field';
    fields.push(gradstudy);
  }

  return fields;
}

/**
 * Scroll to the first element in messages whose
 * display value is not none.
 *
 * @return {Function} update The function that updates scroll position
 */
function updateScrollPosition(event) {
  let timedout;

  return updateWithDelay;

  function updateWithDelay() {
    if (timedout) clearTimeout(timedout);
    timedout = setTimeout(update, 100);
  }

  function update() {
    let fields = requiredFields();

    for (var i = 0; i < fields.length; i++) {
      if (fields[i].isNotValid(fields[i].message)) {
        let topOfElement = fields[i].input.getBoundingClientRect().top;
        let scrollPosition = topOfElement - topOffset();
        window.scrollBy(0, scrollPosition);
        break;
      }
    }
  }

  function topOffset() {
    const additionalOffset = 40;
    const header = document.querySelector(".global-header");
    if (!header) return 0;
    return header.getBoundingClientRect().height + additionalOffset;
  }
}

const submitButton = document.getElementById("add_event");

if (submitButton) {
  submitButton.addEventListener("click", updateScrollPosition());
}
