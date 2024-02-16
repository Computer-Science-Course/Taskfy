/**
 * Represents a default task to be used as a template for new tasks.
 */
export const defaultTask = {
    title: '',
    duration: { hours: 0, minutes: 0 },
    priority: 'baixa',
    date: new Date(),
    state: 'todo',
    isPlaying: false,
}