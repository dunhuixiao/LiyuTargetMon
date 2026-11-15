"""Copy a version's release notes from the changelog without rewriting its bytes."""

import argparse
from pathlib import Path
import re
import sys


def structural_lines(lines: list[bytes]):
    """Yield Markdown lines outside fenced code blocks, with source line indexes."""
    fence_character = ""
    fence_length = 0
    for index, raw_line in enumerate(lines):
        line = raw_line.decode("utf-8").rstrip("\r\n")
        if index == 0:
            line = line.removeprefix("\ufeff")
        if fence_character:
            closing = rf" {{0,3}}{re.escape(fence_character)}{{{fence_length},}}[ \t]*"
            if re.fullmatch(closing, line):
                fence_character = ""
            continue
        fence = re.match(r" {0,3}(`{3,}|~{3,})(.*)$", line)
        if fence and not (fence[1][0] == "`" and "`" in fence[2]):
            fence_character = fence[1][0]
            fence_length = len(fence[1])
            continue
        yield index, line


def extract_notes(source: bytes, version: str) -> bytes:
    if not re.fullmatch(r"v[0-9]+\.[0-9]+\.[0-9]+", version):
        raise ValueError("Version must have the form v1.6.4")
    source.decode("utf-8-sig")
    lines = source.splitlines(keepends=True)
    structure = list(structural_lines(lines))
    headings = []
    for index, line in structure:
        heading = re.fullmatch(r" {0,3}##[ \t]+(.*)", line)
        if heading:
            headings.append((index, heading[1]))
    matching = [
        index for index, title in headings
        if re.match(re.escape(version[1:]) + r"(?:[ \t]|$)", title)
    ]
    if len(matching) != 1:
        raise ValueError(f"Expected one heading for {version}, found {len(matching)}")
    section_start = matching[0]
    section_end = next(
        (index for index, _ in headings if index > section_start), len(lines)
    )

    containers = []
    notes_start = None
    notes_end = None
    for index, line in structure:
        if not section_start < index < section_end:
            continue
        marker = re.fullmatch(r" {0,3}(:{3,})(.*)", line)
        if not marker:
            continue
        label = marker[2].strip()
        if label:
            is_notes = bool(re.fullmatch(r"info[ \t]+更新信息", label))
            if is_notes:
                if notes_start is not None:
                    raise ValueError("Multiple update information containers in this version")
                notes_start = index + 1
            containers.append((len(marker[1]), is_notes))
        elif containers and len(marker[1]) >= containers[-1][0]:
            _, is_notes = containers.pop()
            if is_notes:
                notes_end = index
    if notes_start is None or notes_end is None:
        raise ValueError("A complete update information container is required")
    notes = b"".join(lines[notes_start:notes_end])
    if not notes.decode("utf-8").strip():
        raise ValueError("The update information container is empty")
    return notes


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("version", help="Release version, for example v1.6.4")
    parser.add_argument("--changelog", required=True, type=Path)
    parser.add_argument("--output", type=Path, help="Notes file; omit to print the original bytes")
    args = parser.parse_args()
    try:
        if args.output and args.output.resolve() == args.changelog.resolve():
            raise ValueError("The output must be different from the changelog")
        notes = extract_notes(args.changelog.read_bytes(), args.version)
        if args.output:
            args.output.write_bytes(notes)
        else:
            sys.stdout.buffer.write(notes)
    except (OSError, ValueError) as error:
        parser.error(str(error))


if __name__ == "__main__":
    main()
