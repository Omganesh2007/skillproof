import colleges from './collegeData.json';

const INPUT_SELECTOR = 'input[placeholder="Type at least 2 letters..."]';
const LIST_ID = 'skillproof-college-options';

function setupCollegeAutocomplete() {
  const input = document.querySelector(INPUT_SELECTOR);
  if (!input) return;

  let datalist = document.getElementById(LIST_ID);
  if (!datalist) {
    datalist = document.createElement('datalist');
    datalist.id = LIST_ID;
    document.body.appendChild(datalist);
    input.setAttribute('list', LIST_ID);
  }

  // Replace the small hard-coded React suggestion list with the complete college dataset.
  datalist.replaceChildren(
    ...colleges.map((college) => {
      const option = document.createElement('option');
      option.value = college;
      return option;
    })
  );

  const oldList = input.parentElement?.parentElement?.querySelector('.absolute.z-20');
  if (oldList) oldList.style.display = 'none';

  input.title = 'Type any first letter or part of a college name to see matching colleges';
}

const observer = new MutationObserver(setupCollegeAutocomplete);
observer.observe(document.body, { childList: true, subtree: true });
setupCollegeAutocomplete();
