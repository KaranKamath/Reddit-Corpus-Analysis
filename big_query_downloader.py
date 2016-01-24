import unicodecsv
from apiclient.discovery import build
from oauth2client.client import GoogleCredentials

comments_query = """
SELECT
    *
FROM
    [fh-bigquery:reddit_comments.2015_01],
    [fh-bigquery:reddit_comments.2015_02],
    [fh-bigquery:reddit_comments.2015_03],
    [fh-bigquery:reddit_comments.2015_04],
    [fh-bigquery:reddit_comments.2015_05],
    [fh-bigquery:reddit_comments.2015_06],
    [fh-bigquery:reddit_comments.2015_07],
    [fh-bigquery:reddit_comments.2015_08],
    [fh-bigquery:reddit_comments.2015_09],
    [fh-bigquery:reddit_comments.2015_10],
    [fh-bigquery:reddit_comments.2015_11],
    [fh-bigquery:reddit_comments.2015_12]
WHERE
    subreddit="politics"
"""
posts_query = """
SELECT
    DAYOFYEAR(SEC_TO_TIMESTAMP(created_utc)) as day,
    YEAR(SEC_TO_TIMESTAMP(created_utc)) as year,
    created_utc, url, score, title, id, permalink
FROM
    [fh-bigquery:reddit_posts.full_corpus_201512]
WHERE
    subreddit="politics" AND
    DAYOFYEAR(SEC_TO_TIMESTAMP(created_utc)) == {day} AND
    YEAR(SEC_TO_TIMESTAMP(created_utc)) == {year}
ORDER BY
    score DESC
LIMIT 500
"""

project_id = 'formateamnow'
credentials = GoogleCredentials.get_application_default()
service = build('bigquery', 'v2', credentials=credentials)
responses = []
for i in xrange(1, 60):
    print "Doing ", i
    data = {'query': posts_query.format(day=i, year=2015), 'timeoutMs': 1}
    responses.append(
        service.jobs().query(projectId=project_id, body=data).execute()
    )

results = []
header = None
for idx, r in enumerate(responses):
    r = service.jobs().getQueryResults(
        projectId=r["jobReference"]["projectId"],
        jobId=r["jobReference"]["jobId"],
        timeoutMs=60000
    ).execute()
    results.extend(r["rows"])
    if idx == 0:
        header = [x["name"] for x in r["schema"]["fields"]]
    print idx + 1, len(results)

# while query_response.get("pageToken", None):
#     query_response = query_request.getQueryResults(
#         projectId=project_id,
#         jobId=job_id,
#         timeoutMs=60,
#         pageToken=query_response["pageToken"]
#     ).execute()
#     result.extend(query_response["rows"])
#     print len(query_response["rows"]), len(result)
with open('posts.csv', 'wb') as csvfile:
    w = unicodecsv.writer(csvfile, delimiter=',', quotechar='"',
                          quoting=unicodecsv.QUOTE_MINIMAL)
    w.writerow(header)
    for row in results:
        w.writerow([x['v'] for x in row['f']])
