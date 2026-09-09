import { create } from 'zustand'

type State = {
    tags: string[]
    selectedTag: string
}

type Action = {
    addTag: (tag: State['tags'][number]) => void
    removeLastTag: () => void
    setSelectedTag: (tag: State['tags'][number]) => void
}

export const useTagStore = create<State & Action>()((set) => ({
    tags: ['Weight', 'Other'],
    selectedTag: 'Weight',

    addTag: (tag) =>
        set((state) => ({
            tags: [...state.tags, tag],
        })),

    setSelectedTag: (tag) =>
        set(() => ({
            selectedTag: tag,
        })),

    removeLastTag: () =>
        set((state) => ({
            tags: state.tags.slice(0, -1),
        })),
}))
