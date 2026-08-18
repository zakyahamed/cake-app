# Step 19 — File Storage

## Objective

Add production-ready image/file storage.

Used for:

- Business logos
- Business covers
- Product images
- Service images
- Review images

## Requirements

Use object storage.

Do not store large binary files directly in PostgreSQL.

Create upload abstraction.

Backend should return appropriate file URLs/references.

## Security

Validate:

- File type
- File size
- Ownership
- Upload permissions

## Definition of Done

Business can upload images and customers can view them.
