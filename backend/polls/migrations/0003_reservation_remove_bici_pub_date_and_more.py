# Generated by Django 4.1 on 2022-08-18 16:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0002_rename_question_bici'),
    ]

    operations = [
        migrations.CreateModel(
            name='Reservation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('from_date', models.DateTimeField(verbose_name='date published')),
                ('to_date', models.DateTimeField(verbose_name='date published')),
                ('ranking', models.IntegerField(blank=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='bici',
            name='pub_date',
        ),
        migrations.RemoveField(
            model_name='bici',
            name='question_text',
        ),
        migrations.AddField(
            model_name='bici',
            name='color',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AddField(
            model_name='bici',
            name='enable',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='bici',
            name='location',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AddField(
            model_name='bici',
            name='model',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.DeleteModel(
            name='Choice',
        ),
        migrations.AddField(
            model_name='reservation',
            name='bici',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polls.bici'),
        ),
    ]