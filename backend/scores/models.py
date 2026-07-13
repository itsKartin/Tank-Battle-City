from django.db import models

class Score(models.Model):
    player_name = models.CharField(max_length=50)
    score = models.PositiveIntegerField()
    level_reached = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-score']
