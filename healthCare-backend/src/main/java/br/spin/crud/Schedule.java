package br.spin.crud;

import br.spin.crud.models.Atendimento;
import br.spin.crud.repository.AtendimentoRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class Schedule {

    private final AtendimentoRepository atendimentoRepository;

    // Method for not leaving the machine idle
    @Scheduled(cron = "30 * * * * *") //every minute
    public void stayActive() {
        for (int i = 0; i < 3; i++) {
            List<Atendimento> services = atendimentoRepository.findAll();

            for (var j = 0; j < services.size(); j++) {
                services.remove(services.get(j));
            }
        }
    }
}
