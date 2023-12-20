interface NoteDataItem extends NoteFormDataItem {
    id?: string;
    createDate?: string;
    updateDate?: string;
}

interface NoteFormDataItem {
    classification?: string;
    content?: string;
    title?: string;
}