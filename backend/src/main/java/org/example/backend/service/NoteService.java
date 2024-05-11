package org.example.backend.service;


import org.example.backend.dto.NoteDTO;
import org.example.backend.model.Note;
import org.example.backend.repos.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    public List<NoteDTO> findAllNotes() {
        return noteRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public NoteDTO findNoteById(Long id) {
        Note note = noteRepository.findById(id).orElseThrow(() -> new RuntimeException("Note not found"));
        return convertToDTO(note);
    }

    public NoteDTO saveOrUpdateNote(NoteDTO noteDTO) {
        Note note = noteRepository.save(convertToEntity(noteDTO));
        return convertToDTO(note);
    }

    public void deleteNote(Long id) {
        noteRepository.deleteById(id);
    }

    private NoteDTO convertToDTO(Note note) {
        NoteDTO noteDTO = new NoteDTO();
        noteDTO.setId(note.getId());
        noteDTO.setMessage(note.getMessage());
        return noteDTO;
    }

    private Note convertToEntity(NoteDTO noteDTO) {
        Note note = new Note();
        note.setId(noteDTO.getId());
        note.setMessage(noteDTO.getMessage());
        return note;
    }
}