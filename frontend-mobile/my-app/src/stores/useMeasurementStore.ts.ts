import { HistoryEntry } from '@dynamis/shared'
import { create } from 'zustand'

type Tag = {
    tagName: string
    records?: HistoryEntry[]
}

type State = {
    selectedTag: string
    headerTags: Tag[]
    tags: Tag[]
}

type Actions = {
    fetchTags: () => Promise<void> | void
    getTag: (tagName: string) => Tag | undefined;
    addTag: (tag: Tag) => void
    addEntryToTag: (tagName: string, entry: HistoryEntry) => void
    addHeaderTag: (tag: Tag) => void
    setSelectedTag: (tagName: string) => void
    setEntries: (tagName: string, entries: HistoryEntry[]) => void
}

const defaultTags: Tag[] = [
    { tagName: 'Weight', records: [] },
    { tagName: 'Other', records: [] },
]

export const useMeasurementStore = create<State & Actions>()((set, get) => ({
    selectedTag: 'Weight',
    tags: defaultTags,
    headerTags: defaultTags,

    fetchTags: () => {
        set({ tags: defaultTags })
    },

    getTag: (tagName) => {
        return get().tags.find((tag) => tag.tagName === tagName);
    },

    addTag: (tag) => {
        set((state) => ({ tags: [...state.tags, tag] }))
    },

    addEntryToTag: (tagName, entry) => set((state) => ({
        tags: state.tags.map((t) =>
            t.tagName === tagName
                ? { ...t, records: [...(t.records ?? []), entry] }
                : t
        ),
    })),

    addHeaderTag: (tag) => set((state) => {
        if (state.headerTags.some((t) => t.tagName === tag.tagName)) {
            return state; // no-op, tag already exists
        }
        return { headerTags: [...state.headerTags, tag] };
    }),
    setSelectedTag: (tagName) => set({ selectedTag: tagName }),

    setEntries: (tagName, entries) => set((state) => ({
        tags: state.tags.map((t) =>
            t.tagName === tagName ? { ...t, records: entries } : t
        ),
    })),
}))

// Component treats tags as a separate store; same underlying data for now.
export const useTagStore = useMeasurementStore;