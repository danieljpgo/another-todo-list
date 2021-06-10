export function generateDoneStatus(counter: number) {
  if (counter > 9) return 'I will be alone here, I see ...';
  if (counter > 6) return "hey, give me some done tasks, I'm alone here";
  if (counter > 2) return "you're going to complete some tasks, right?";
  return '';
}

export function generateTodoStatus(counter: number) {
  if (counter > 9) return "I'm kind of alone here, add new tasks for me";
  if (counter > 4) return 'impressive, did you finish this many tasks?';
  return '';
}
