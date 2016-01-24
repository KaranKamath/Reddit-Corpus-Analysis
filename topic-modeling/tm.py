from __future__ import print_function

from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.decomposition import NMF, LatentDirichletAllocation

import pandas as pd
import numpy as np
import datetime
import time
import json
import sys
import os

data = pd.read_csv('../data/politics_full.csv',error_bad_lines=False)
data['created_utc'] = pd.to_numeric(data['created_utc'], errors='coerce')
data = data[~(np.isnan(data['created_utc']))]
data = data[(pd.notnull(data['title']))]
data = data[['created_utc', 'title', 'url', 'id', 'score']]

months = [
        ['31-10-2015', '30-11-2015'],
        ['30-09-2015', '31-10-2015'],
        ['31-08-2015', '30-09-2015'],
        ['31-07-2015', '31-08-2015'],
        ['30-06-2015', '31-07-2015'],
        ['31-05-2015', '30-06-2015'],
        ['30-04-2015', '31-05-2015'],
        ['31-03-2015', '30-04-2015'],
        ['28-02-2015', '31-03-2015'],
        ['31-01-2015', '28-02-2015'],
        ['31-12-2014', '31-01-2015'],
        # ['30-11-2014', '31-12-2014'],
        # ['31-10-2014', '30-11-2014'],
        # ['30-09-2014', '31-10-2014'],
        # ['31-08-2014', '30-09-2014'],
        # ['31-07-2014', '31-08-2014'],
        # ['30-06-2014', '31-07-2014'],
        # ['31-05-2014', '30-06-2014'],
        # ['30-04-2014', '31-05-2014'],
        # ['31-03-2014', '30-04-2014'],
        # ['28-02-2014', '31-03-2014'],
        # ['31-01-2014', '28-02-2014'],
        # ['31-12-2013', '31-01-2014'],
        # ['30-11-2013', '31-12-2013'],
        #['31-10-2013', '30-11-2013'],
        #['30-09-2013', '31-10-2013'],
        #['31-08-2013', '30-09-2013'],
        #['31-07-2013', '31-08-2013'],
        #['30-06-2013', '31-07-2013'],
        #['31-05-2013', '30-06-2013'],
        #['30-04-2013', '31-05-2013'],
        #['31-03-2013', '30-04-2013'],
        #['28-02-2013', '31-03-2013'],
        #['31-01-2013', '28-02-2013'],
        #['31-12-2012', '31-01-2013'],
        #['30-11-2012', '31-12-2012'],
        #['31-10-2012', '30-11-2012'],
        #['30-09-2012', '31-10-2012'],
        #['31-08-2012', '30-09-2012'],
        #['31-07-2012', '31-08-2012'],
        #['30-06-2012', '31-07-2012'],
        #['31-05-2012', '30-06-2012'],
        #['30-04-2012', '31-05-2012'],
        #['31-03-2012', '30-04-2012'],
        #['29-02-2012', '31-03-2012'],
        #['31-01-2012', '28-02-2012'],
        #['31-12-2011', '31-01-2012'],
        #['30-11-2011', '31-12-2011'],
        #['31-10-2011', '30-11-2011'],
        #['30-09-2011', '31-10-2011'],
        #['31-08-2011', '30-09-2011'],
        #['31-07-2011', '31-08-2011'],
        #['30-06-2011', '31-07-2011'],
        #['31-05-2011', '30-06-2011'],
        #['30-04-2011', '31-05-2011'],
        #['31-03-2011', '30-04-2011'],
        #['28-02-2011', '31-03-2011'],
        #['31-01-2011', '28-02-2011'],
        #['31-12-2010', '31-01-2011'],
        #['30-11-2010', '31-12-2010'],
        #['31-10-2010', '30-11-2010'],
        #['30-09-2010', '31-10-2010'],
        #['31-08-2010', '30-09-2010'],
        #['31-07-2010', '31-08-2010'],
        #['30-06-2010', '31-07-2010'],
        #['31-05-2010', '30-06-2010'],
        #['30-04-2010', '31-05-2010'],
        #['31-03-2010', '30-04-2010'],
        #['28-02-2010', '31-03-2010'],
        #['31-01-2010', '28-02-2010'],
        #['31-12-2009', '31-01-2010'],
        #['30-11-2009', '31-12-2009'],
        #['31-10-2009', '30-11-2009'],
        #['30-09-2009', '31-10-2009'],
        #['31-08-2009', '30-09-2009'],
        #['31-07-2009', '31-08-2009'],
        #['30-06-2009', '31-07-2009'],
        #['31-05-2009', '30-06-2009'],
        #['30-04-2009', '31-05-2009'],
        #['31-03-2009', '30-04-2009'],
        #['28-02-2009', '31-03-2009'],
        #['31-01-2009', '28-02-2009'],
        #['31-12-2008', '31-01-2009'],
        #['30-11-2008', '31-12-2008'],
        #['31-10-2008', '30-11-2008'],
        #['30-09-2008', '31-10-2008'],
        #['31-08-2008', '30-09-2008'],
        #['31-07-2008', '31-08-2008'],
        #['30-06-2008', '31-07-2008'],
        #['31-05-2008', '30-06-2008'],
        #['30-04-2008', '31-05-2008'],
        #['31-03-2008', '30-04-2008'],
        #['29-02-2008', '31-03-2008'],
        #['31-01-2008', '28-02-2008'],
        #['31-12-2007', '31-01-2008'],
        #['30-11-2007', '31-12-2007'],
        #['31-10-2007', '30-11-2007'],
        #['30-09-2007', '31-10-2007']
        ]

n_features = 5000
n_topics = 10
n_top_words = 20

def print_top_words(model, feature_names, n_top_words):
    toreturn = []
    for topic_idx, topic in enumerate(model.components_):
        toreturn.append(" ".join([feature_names[i]
            for i in topic.argsort()[:-n_top_words -1: -1]]))
    return toreturn

def create_topic_models(posts):
    try:
        # print(posts.shape)
        # print(posts.columns.values)
        tfidf_vectorizer = TfidfVectorizer(max_df=0.80, min_df=2, max_features=n_features, stop_words='english')

        tfidf = tfidf_vectorizer.fit_transform(posts["title"])

        tf_vectorizer = CountVectorizer(max_df=0.80, min_df=2, max_features=n_features, stop_words='english')

        nmf = NMF(n_components=n_topics, random_state=1, alpha=0.1, l1_ratio=0.5).fit(tfidf)
        tfidf_feature_names = tfidf_vectorizer.get_feature_names()
        topics = print_top_words(nmf, tfidf_feature_names, n_top_words)
        post_topics = []
        for i in range(0, tfidf.shape[0]):
            post_topics.append(topics[np.argmax(nmf.transform(tfidf[i]), axis=1)])
        return topics, post_topics
    except Exception as e:
        print(e)
       	exc_type, exc_obj, exc_tb = sys.exc_info()
    	fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
    	print(exc_type, fname, exc_tb.tb_lineno) 
        exit()
        return None, None


for month in months:
    start = int(time.mktime(datetime.datetime.strptime(month[0], "%d-%m-%Y").timetuple()))
    end = int(time.mktime(datetime.datetime.strptime(month[1], "%d-%m-%Y").timetuple()))
    temp = data[data['created_utc']>start]
    month_posts = temp[temp['created_utc']<end]
    topic_array, post_topics = create_topic_models(month_posts)
    month_posts['topics'] = post_topics
    topic_array = month_posts['topics'].value_counts()
    month_posts.sort('score', ascending=False)
    best = month_posts.groupby(['topics']).head(5)
    json_out = '{"topics":%s, "posts":%s}' % (topic_array.to_json(), best.to_json(orient='records'))
    filename = "%s-to-%s-posts.json" % (month[0], month[1])
    with open(filename, 'w+') as f1:
        print(json_out, file=f1)
