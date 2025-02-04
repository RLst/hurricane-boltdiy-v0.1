// Utility function to parse exercise data
function parseExercise(command) {
  // Regular expressions for matching different parts of the command
  const exerciseNameRegex = /^([a-zA-Z\s]+)(?=\s\d|\s[x\d]+r|[,\s]|$)/i; // Matches exercise name
  const setsRegex = /(\d+)(kg|kgs|lbs|lb|minutes|mins|min|m|seconds|secs|sec|s)?\s*([x\d]+r|\d+)(reps)?/gi; // Matches sets
  const notesRegex = /(?:,?\s*)([a-zA-Z].*)/i; // Matches notes

  // Extract exercise name
  const exerciseNameMatch = command.match(exerciseNameRegex);
  const exerciseName = exerciseNameMatch ? exerciseNameMatch[1].trim() : null;

  // Extract sets
  const sets = [];
  let setMatch;
  while ((setMatch = setsRegex.exec(command)) !== null) {
    const weightDurationValue = parseFloat(setMatch[1]);
    const weightDurationUnit = (setMatch[2] || '').toLowerCase();
    const repsValue = parseInt(setMatch[3].replace(/[xr]/gi, ''), 10); // Remove "x" or "r" and parse

    let normalizedWeightDuration = weightDurationValue;
    if (weightDurationUnit === 'lbs' || weightDurationUnit === 'lb') {
      normalizedWeightDuration = weightDurationValue * 0.453592; // Convert lbs to kg
    } else if (
      weightDurationUnit === 'minutes' ||
      weightDurationUnit === 'mins' ||
      weightDurationUnit === 'min' ||
      weightDurationUnit === 'm'
    ) {
      normalizedWeightDuration = weightDurationValue * 60; // Convert minutes to seconds
    }

    sets.push({
      weightDuration: normalizedWeightDuration,
      unit: weightDurationUnit === 'lbs' || weightDurationUnit === 'lb' ? 'kg' : weightDurationUnit ? 'seconds' : '', // Normalize unit
      reps: repsValue,
    });
  }

  // Extract notes
  const notesMatch = command.match(notesRegex);
  const notes = notesMatch ? notesMatch[1].trim() : '';

  return {
    name: exerciseName,
    sets: sets,
    notes: notes,
  };
}


export default parseExercise;
