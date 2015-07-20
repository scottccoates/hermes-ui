import T from 'tcomb';

export const stringDateNormalize = T.func(T.Str, T.Dat, "StringDate").of(strInput => new Date(strInput));
