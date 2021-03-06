import pytest
import responses

from ajapaik.ajapaik.models import Photo, Album


@pytest.mark.django_db
@responses.activate
def test_photos_tartunlp_translation():
    for each in [
        'Igaunijas teātrimaja, skatā Igaunija puiesteelt',
        'Estijos teatro namai, vaizdas Estija puiesteelt',
        'Estonia Theatre House, view Estonia puiesteelt',
        'Эстония театрический дом, вид Эстония пуiesteelt',
        'Estlands Theaterhaus, Sicht auf Estland puiesteelt',
    ]:
        responses.add(responses.GET, 'https://api.neurotolge.ee/v1.1/translate', json={'tgt': each})
    # Make sure _fi isn't overridden - et is picked as the source because it is at the start of TARTUNLP_LANGUAGES
    test_instance = Photo(description_et='Estonia teatrimaja, vaade Estonia puiesteelt',
                          description_fi='Viro teatrimaja, vaade Viro puiesteelt')
    test_instance.fill_untranslated_fields()

    assert 'teatrimaja' in getattr(test_instance, 'description_et')
    assert 'Igaunijas' in getattr(test_instance, 'description_lv')
    assert 'Estijos' in getattr(test_instance, 'description_lt')
    assert 'Theatre' in getattr(test_instance, 'description_en')
    assert 'театрический' in getattr(test_instance, 'description_ru')
    assert 'Theaterhaus' in getattr(test_instance, 'description_de')
    assert 'Viro' in getattr(test_instance, 'description_fi')
    assert 'et,fi' == getattr(test_instance, 'description_original_language')


@pytest.mark.django_db
@responses.activate
def test_albums_tartunlp_translation():
    for each in [
        'Stereofotos no Parīzes (Francija)',
        'Stereofotos iš Paryžiaus (Prancūzija)',
        'Stereophotos from Paris (France)',
        'Стереофоты из Парижа (Франция)',
        'Stereofotot Pariisista (Ranska)'
    ]:
        responses.add(responses.GET, 'https://api.neurotolge.ee/v1.1/translate', json={'tgt': each})
    test_instance = Album(name_et='Stereofotosid Pariisist (Prantsusmaa)',
                          name_de='Stereophotos aus Paris (Frankreich)', atype=Album.CURATED)
    test_instance.fill_untranslated_fields()

    assert 'Pariisist' in getattr(test_instance, 'name_et')
    assert 'Parīzes' in getattr(test_instance, 'name_lv')
    assert 'Paryžiaus' in getattr(test_instance, 'name_lt')
    assert 'Paris' in getattr(test_instance, 'name_en')
    assert 'Парижа' in getattr(test_instance, 'name_ru')
    assert 'Frankreich' in getattr(test_instance, 'name_de')
    assert 'Pariisista' in getattr(test_instance, 'name_fi')
    assert 'et,de' == getattr(test_instance, 'name_original_language')
