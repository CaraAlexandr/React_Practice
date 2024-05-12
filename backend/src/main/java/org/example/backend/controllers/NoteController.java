package org.example.backend.controllers;

import org.example.backend.dto.NoteDTO;
import org.example.backend.security.JwtUtil;
import org.example.backend.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @GetMapping
    public ResponseEntity<List<NoteDTO>> getAllNotes(@RequestParam(defaultValue = "0") int page,
                                                     @RequestParam(defaultValue = "10") int size) {
        List<NoteDTO> notes = noteService.findAllNotes(page, size);
        return new ResponseEntity<>(notes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoteDTO> getNoteById(@PathVariable Long id) {
        NoteDTO noteDTO = noteService.findNoteById(id);
        return new ResponseEntity<>(noteDTO, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<NoteDTO> createOrUpdateNote(@RequestBody NoteDTO noteDTO) {
        NoteDTO savedNote = noteService.saveOrUpdateNote(noteDTO);
        return new ResponseEntity<>(savedNote, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PostMapping("/token")
    public ResponseEntity<String> generateToken(@RequestBody Map<String, Object> claims) {
        String token = JwtUtil.generateToken(claims);
        return new ResponseEntity<>(token, HttpStatus.CREATED);
    }

}