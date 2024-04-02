package br.spin.crud;

import br.spin.crud.models.Atendimento;
import br.spin.crud.repository.AtendimentoRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Component
@RequiredArgsConstructor
public class Schedule {

    private final AtendimentoRepository atendimentoRepository;

    @PersistenceContext
    private final EntityManager entityManager;

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

    @Transactional
    @Scheduled(cron = "0 30 4 * * *") //every day 28th at 3:30AM
    public void optimizeDatabase() {
        entityManager.createNativeQuery("commit; vacuum full analyze; commit;").executeUpdate();
        entityManager.createNativeQuery("commit; reindex database healthcare_db; commit;").executeUpdate();
    }
}
