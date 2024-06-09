class Note {
    constructor(
        id,
        color,
        labelIds,
        content,
        updateAt,
        isBookmarked,
        deleteAt
    ) {
        this.id = id;
        this.color = color;
        this.labelIds = labelIds;
        this.content = content;
        this.updateAt = updateAt;
        this.deletedAt = deleteAt;
        this.isBookmarked = isBookmarked;
    }
}

export default Note;
