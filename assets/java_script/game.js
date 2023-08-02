// Making array of difficulties for game 
const difficulties = [
  'beginner',
  'elementary',
  'intermediate',
  'advanced',
  'expert',
  'master',
  'legendary'
];
// Words list for each difficulty
const word_lists = {
  beginner: ['apple', 'banana', 'cat', 'dog', 'elephant', 'fish', /* add more words */],
  elementary: ['house', 'book', 'school', 'tree', 'sun', 'moon', /* add more words */],
  intermediate: ['computer', 'programming', 'language', 'keyboard', 'mouse', /* add more words */],
  advanced: ['television', 'university', 'jupiter', 'oxygen', 'diamond', /* add more words */],
  expert: ['python', 'javascript', 'algorithm', 'database', 'framework', /* add more words */],
  master: ['champion', 'phenomenal', 'hypothesis', 'incredible', /* add more words */],
  legendary: ['abcdefghijklmnopqrstuvwxyz', 'elephantine', 'xylophone', /* add more words */]
};

// Changing label "begginer" to other diffiiculties from arrray based on slider value
function update_slider_difficulty_name() {
  const slider = document.getElementById("difficulty");
  const label = document.getElementById("difficulty_label");
  // Map the slider value to the corresponding difficulty level
  const selectedDifficulty = difficulties[parseInt(slider.value) - 1];
  // Update the displayed difficulty label
  label.textContent = selectedDifficulty;
}

